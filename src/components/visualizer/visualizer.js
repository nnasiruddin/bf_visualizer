import {ArrowKeyStepper, AutoSizer, Grid} from "react-virtualized";
import React from "react";

const Visualizer = props => {
    const {mode, scrollToColumn, scrollToRow, data} = props;

    const columnCount = data.length > 0 ? data.length : 10;

    const _getColumnWidth = () => {
        return 100;
    };

    const _getRowHeight = () => {
        return 30;
    };

    const _cellRenderer = ({
                               columnIndex,
                               key,
                               rowIndex,
                               scrollToColumn,
                               scrollToRow,
                               style,
                               data
                           }) => {

        const className = (rowIndex === scrollToRow && columnIndex === scrollToColumn) ? 'focused-cell' : 'cell';
        const content = (typeof data[columnIndex] !== 'undefined' || data[columnIndex] != null) ? data[columnIndex] : '';
        return (
            <span
                role="none"
                key={key}
                className={className}
                style={style}>

        {rowIndex === 0 ? columnIndex : content}

      </span>
        );
    };

    return (
        <ArrowKeyStepper
            columnCount={columnCount}
            rowCount={2}
            mode={mode}
            data={data}
            scrollToColumn={scrollToColumn}
            scrollToRow={scrollToRow}
        >
            {
                ({onSectionRendered, scrollToColumn, scrollToRow}) => (
                    <AutoSizer disableHeight>
                        {({width}) => (
                            <Grid
                                columnWidth={_getColumnWidth}
                                columnCount={columnCount}
                                height={62}
                                className='grid'
                                onSectionRendered={onSectionRendered}
                                cellRenderer={({columnIndex, key, rowIndex, style}) =>
                                    _cellRenderer({
                                        columnIndex,
                                        key,
                                        rowIndex,
                                        scrollToColumn,
                                        scrollToRow,
                                        style,
                                        data
                                    })
                                }
                                rowHeight={_getRowHeight}
                                rowCount={2}
                                scrollToColumn={scrollToColumn}
                                scrollToRow={scrollToRow}
                                width={width}
                            />
                        )}
                    </AutoSizer>
                )
            }
        </ArrowKeyStepper>
    );
};

export default Visualizer;
