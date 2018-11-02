import React from 'react';
import renderer from 'react-test-renderer';
import initState from '../../reducers/initialState';
import { VisualizerPage } from './visualizer';

describe('Visualizer rendering test', () => {

    it('should render Dataset Page component correctly', () => {
        const tree = renderer
            .create(
                <VisualizerPage
                    mode={initState.visualizer.mode}
                    scrollToRow={initState.visualizer.scrollToRow}
                    scrollToColumnData={initState.visualizer.scrollToColumnData}
                    scrollToColumnScript={initState.visualizer.scrollToColumnScript}
                    editMode={initState.visualizer.editMode}
                    inputScript={initState.visualizer.inputScript}
                    output={initState.visualizer.output}
                    id={initState.visualizer.id}
                    data={initState.visualizer.data}
                    script={initState.visualizer.script}
                >
                </VisualizerPage>
            ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

