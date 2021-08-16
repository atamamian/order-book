import { OrderList, OrderObject } from '@/types/feedTypes';
import { dropRight, isEmpty, reduce, sortBy } from 'lodash';
import { floatSafeRemainder } from './calculations';

export const formatListForFeed = ({
  groupStep,
  list,
  orderType,
}: {
  groupStep: number;
  list: OrderList;
  orderType: 'sell' | 'buy';
}): OrderObject[] => {
  if (!isEmpty(list)) {
    // Check for lowest grouping to only run group handling when needed
    const isLowestGrouping: boolean = groupStep === 0.5 || groupStep === 0.05;

    // Sort the list
    // Low -> High for asks
    // High -> Low for bids
    let formattedList =
      orderType === 'sell'
        ? sortBy([...list.values()], (order) => order.price)
        : sortBy([...list.values()], (order) => order.price).reverse();

    // Group handling logic
    if (!isLowestGrouping) {
      // First we find the current grouping price based on the grouping tick step
      let currentGroupingPrice: number =
        floatSafeRemainder(formattedList[0].price, groupStep) > 0
          ? formattedList[0].price -
            floatSafeRemainder(formattedList[0].price, groupStep) +
            groupStep
          : formattedList[0].price - floatSafeRemainder(formattedList[0].price, groupStep);

      // Set our current grouped order at the current grouped price point
      let currentGroupingOrder: OrderObject = { price: currentGroupingPrice, size: 0, total: 0 };

      // Iterate through the list and combine orders into groups
      formattedList = reduce(
        formattedList,
        (acc, order, index) => {
          // If current order's price belongs to this group,
          // add order size to current group's size
          // Additionally, if it's the last order in the list,
          // push group into accumulator and return it.
          if (
            (orderType === 'buy' && order.price > currentGroupingPrice) ||
            (orderType === 'sell' && order.price < currentGroupingPrice)
          ) {
            currentGroupingOrder.size += order.size;
            if (index === formattedList.length - 1) {
              acc.push(currentGroupingOrder);
              return acc;
            }
          }

          // If current order's price is the same as current group,
          // combine sizes and push group order into accumulator.
          // Set next grouped order at next grouped price point.
          else if (order.price === currentGroupingPrice) {
            currentGroupingOrder.size += order.size;
            acc.push(currentGroupingOrder);
            currentGroupingPrice =
              orderType === 'buy'
                ? currentGroupingPrice - groupStep
                : currentGroupingPrice + groupStep;
            currentGroupingOrder = { price: currentGroupingPrice, size: 0, total: 0 };
          }

          // If current order's price exceeds our grouped price point,
          // we need to check for specific edge cases within.
          else {
            // If our current grouped order has a size,
            // push it into the accumulator.
            if (currentGroupingOrder.size > 0) {
              acc.push(currentGroupingOrder);
            }

            // Step our grouped price until we meet acceptable criteria
            // to proceed to next order
            for (;;) {
              currentGroupingPrice =
                orderType === 'buy'
                  ? currentGroupingPrice - groupStep
                  : currentGroupingPrice + groupStep;

              // If our next grouped price exceed the current order's price,
              // break out and continue grouping
              if (
                (orderType === 'buy' && order.price > currentGroupingPrice) ||
                (orderType === 'sell' && order.price < currentGroupingPrice)
              ) {
                break;
              }

              // If the next grouped price is the same as our current order's price,
              // set our current grouped order to the current order's size
              // and push into accumulator.
              // Step into next grouped price and set next grouped order and return accumulator.
              if (currentGroupingPrice === order.price) {
                currentGroupingOrder = { price: currentGroupingPrice, size: order.size, total: 0 };
                acc.push(currentGroupingOrder);
                currentGroupingPrice =
                  orderType === 'buy'
                    ? currentGroupingPrice - groupStep
                    : currentGroupingPrice + groupStep;
                currentGroupingOrder = { price: currentGroupingPrice, size: 0, total: 0 };
                return acc;
              }
            }

            // If we break out of the for loop,
            // set our next grouped order at the next grouped price.
            currentGroupingOrder = { price: currentGroupingPrice, size: order.size, total: 0 };
          }
          return acc;
        },
        [] as OrderObject[],
      );
    }

    if (formattedList.length > 20) {
      formattedList = dropRight(formattedList, formattedList.length - 20);
    }

    formattedList.forEach((order, index) => {
      if (index === 0) {
        order.total = order.size;
      } else {
        order.total = formattedList[index - 1].total + order.size;
      }
    });
    return formattedList;
  } else {
    return [];
  }
};
