import { BigNumber } from '0x.js';
import React from 'react';
import { connect } from 'react-redux';

import { UI_DECIMALS_DISPLAYED_ORDER_SIZE, UI_DECIMALS_DISPLAYED_PRICE_ETH } from '../../common/constants';
import { getOrderBook, getSelectedToken, getUserOrders, getWeb3State } from '../../store/selectors';
import { errorsWallet } from '../../util/error_messages';
import { themeColors } from '../../util/theme';
import { tokenAmountInUnits } from '../../util/tokens';
import { OrderBook, OrderBookItem, OrderSide, StoreState, TabItem, Token, UIOrder, Web3State } from '../../util/types';
import { Card } from '../common/card';
import { CardTabSelector } from '../common/card_tab_selector';
import { EmptyContent } from '../common/empty_content';
import { ErrorCard, ErrorIcons, FontSize } from '../common/error_card';
import { CardLoading } from '../common/loading';
import { ShowNumberWithColors } from '../common/show_number_with_colors';
import { CustomTD, CustomTDLast, CustomTDTitle, Table, TH, THead, THLast, TR } from '../common/table';

interface StateProps {
    orderBook: OrderBook;
    selectedToken: Token | null;
    userOrders: UIOrder[];
    web3State?: Web3State;
}

type Props = StateProps;

enum Tab {
    Current,
    History,
}

interface State {
    tab: Tab;
}

const orderToRow = (
    order: OrderBookItem,
    index: number,
    count: number,
    selectedToken: Token,
    mySizeOrders: OrderBookItem[] = [],
) => {
    const size = tokenAmountInUnits(order.size, selectedToken.decimals, UI_DECIMALS_DISPLAYED_ORDER_SIZE);
    const price = order.price.toString();
    const priceColor = order.side === OrderSide.Buy ? themeColors.green : themeColors.orange;
    const time: string = '';
    const timeColor = time ? '#000' : themeColors.lightGray;

    const mySize = mySizeOrders.reduce((sumSize, mySizeItem) => {
        if (mySizeItem.price.equals(order.price)) {
            return sumSize.add(mySizeItem.size);
        }
        return sumSize;
    }, new BigNumber(0));

    const mySizeConverted = tokenAmountInUnits(mySize, selectedToken.decimals, UI_DECIMALS_DISPLAYED_ORDER_SIZE);

    return (
        <TR key={index}>
            <CustomTD styles={{ tabular: true, textAlign: 'right' }}>
                <ShowNumberWithColors num={new BigNumber(size)} />
            </CustomTD>
            <CustomTD styles={{ tabular: true, textAlign: 'right' }}>
                {mySizeConverted !== '0.00' ? mySizeConverted : '-'}
            </CustomTD>
            <CustomTD styles={{ tabular: true, textAlign: 'right', color: priceColor }}>
                {parseFloat(price).toFixed(UI_DECIMALS_DISPLAYED_PRICE_ETH)}
            </CustomTD>
            <CustomTDLast styles={{ tabular: true, textAlign: 'right', color: timeColor }}>
                {time.length ? time : '-'}
            </CustomTDLast>
        </TR>
    );
};

class OrderBookTable extends React.Component<Props, State> {
    public state = {
        tab: Tab.Current,
    };

    public render = () => {
        const { orderBook, selectedToken, web3State } = this.props;
        const { sellOrders, buyOrders, mySizeOrders, spread } = orderBook;
        const setTabCurrent = () => this.setState({ tab: Tab.Current });
        const setTabHistory = () => this.setState({ tab: Tab.History });

        const cardTabs: TabItem[] = [
            {
                active: this.state.tab === Tab.Current,
                onClick: setTabCurrent,
                text: 'Current',
            },
            {
                active: this.state.tab === Tab.History,
                onClick: setTabHistory,
                text: 'History',
            },
        ];

        const mySizeSellArray = mySizeOrders.filter((order: { side: OrderSide }) => {
            return order.side === OrderSide.Sell;
        });

        const mySizeBuyArray = mySizeOrders.filter((order: { side: OrderSide }) => {
            return order.side === OrderSide.Buy;
        });

        let content: React.ReactNode;
        switch (web3State) {
            case Web3State.NotInstalled: {
                content = (
                    <ErrorCard
                        fontSize={FontSize.Large}
                        text={errorsWallet.mmNotInstalled}
                        icon={ErrorIcons.Metamask}
                    />
                );
                break;
            }
            case Web3State.Locked: {
                content = <ErrorCard fontSize={FontSize.Large} text={errorsWallet.mmLocked} icon={ErrorIcons.Lock} />;
                break;
            }
            default: {
                if (!selectedToken) {
                    content = <CardLoading />;
                } else if (!buyOrders.length && !sellOrders.length) {
                    content = <EmptyContent alignAbsoluteCenter={true} text="There are no orders to show" />;
                } else {
                    content = (
                        <Table fitInCard={true}>
                            <THead>
                                <TR>
                                    <TH styles={{ textAlign: 'right', borderBottom: true }}>Trade size</TH>
                                    <TH styles={{ textAlign: 'right', borderBottom: true }}>My Size</TH>
                                    <TH styles={{ textAlign: 'right', borderBottom: true }}>Price (ETH)</TH>
                                    <THLast styles={{ textAlign: 'right', borderBottom: true }}>Time</THLast>
                                </TR>
                            </THead>
                            <tbody>
                                {sellOrders.map((order, index) =>
                                    orderToRow(order, index, sellOrders.length, selectedToken, mySizeSellArray),
                                )}
                                <TR>
                                    <CustomTDTitle styles={{ textAlign: 'right', borderBottom: true, borderTop: true }}>
                                        Spread
                                    </CustomTDTitle>
                                    <CustomTD styles={{ textAlign: 'right', borderBottom: true, borderTop: true }}>
                                        {}
                                    </CustomTD>
                                    <CustomTD
                                        styles={{
                                            tabular: true,
                                            textAlign: 'right',
                                            borderBottom: true,
                                            borderTop: true,
                                        }}
                                    >
                                        {spread.toFixed(UI_DECIMALS_DISPLAYED_PRICE_ETH)}
                                    </CustomTD>
                                    <CustomTDLast styles={{ textAlign: 'right', borderBottom: true, borderTop: true }}>
                                        {}
                                    </CustomTDLast>
                                </TR>
                                {buyOrders.map((order, index) =>
                                    orderToRow(order, index, buyOrders.length, selectedToken, mySizeBuyArray),
                                )}
                            </tbody>
                        </Table>
                    );
                }
                break;
            }
        }

        return (
            <Card title="Orderbook" action={<CardTabSelector tabs={cardTabs} />}>
                {content}
            </Card>
        );
    };
}

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        orderBook: getOrderBook(state),
        selectedToken: getSelectedToken(state),
        userOrders: getUserOrders(state),
        web3State: getWeb3State(state),
    };
};

const OrderBookTableContainer = connect(mapStateToProps)(OrderBookTable);

export { OrderBookTable, OrderBookTableContainer };
