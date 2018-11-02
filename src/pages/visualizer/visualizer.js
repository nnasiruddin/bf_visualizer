import React from 'react';
import './visualizer.css';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'react-virtualized/styles.css'; // only needs to be imported once
import Visualizer from '../../components/visualizer';
import { Button, FormControl, FormGroup, ControlLabel, Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import * as visualizerActions from '../../actions/visualizerActions';

export const VisualizerPage = props => {
    const { data, scrollToRow, scrollToColumnScript, scrollToColumnData, mode , editMode, script, output, done, showError} = props;

    const handleScriptInput = (value) => {
        props.actions.updateInputScript(value);
    };

    const handleExecute = () => {
      props.actions.loadBrainFuck()
    };

    const handleStep = () => {
        props.actions.step()
    };

    const handlePlay = () => {
        props.actions.play()
    };

    const handleStop = () => {
      props.actions.stop()
    };

    const generateForm = () => {
        return (
            <div>
                <div className='visualize-form'>
                    <Grid>
                        <Row>
                            <Col xs={10}>
                                <form>
                                    <FormGroup controlId="visualizeScript">
                                        <ControlLabel>Script</ControlLabel>
                                        <FormControl componentClass="textarea" onChange={(event) => handleScriptInput(event.target.value)} placeholder="Enter Script Here..." />
                                    </FormGroup>
                                </form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <div className='visualize-footer'>
                                    <Button onClick={() => handleExecute()}>Execute Script</Button>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        )
    };

    const generateDisplay = (data, scrollToRow, scrollToColumn, mode, output, done) => {
        return (
            <div className='visualize-display'>
                <Grid>
                    <Row>
                        <Col xs={4}>
                            <h3>Script:</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={10}>
                            <Visualizer data={data} scrollToRow={scrollToRow} scrollToColumn={scrollToColumn} mode={mode} />
                        </Col>
                    </Row>
                    <Row className='visualize-display'>
                        { !done &&
                            <Col xs={3}>
                                <Button onClick={() => handleStep()}>Step</Button>
                            </Col>
                        }
                        {
                            !done &&
                            <Col xs={3}>
                                <Button onClick={() => handlePlay()}>Play</Button>
                            </Col>
                        }
                    </Row>
                    <Row>
                        <Col xs={10}>
                            <div>
                                <h3>Output:</h3>
                            </div>
                            <div className='visualize-output'>
                                <div>
                                    {output}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    };

    const generateError = () => {
      return (
          <div className='visualize-error'>
              <Glyphicon style={{fontSize: '80px', color: 'red'}} glyph="exclamation-sign" />
              <h3>Oops! Its not you its us, that code brainfucked our compiler, please reload the page to restart</h3>
          </div>
      )
    };

    const generateMainScreen = () => {
      return (
          <div>
              <div className='visualize-header'>
                  <h2>Brain Fuck Visualizer</h2>
              </div>
              <Grid>
                  <Row>
                      <Col xs={4}>
                          <h3>Data:</h3>
                      </Col>
                  </Row>
                  <Row>
                      <Col xs={10}>
                          <Visualizer data={data} scrollToRow={scrollToRow} scrollToColumn={scrollToColumnData} mode={mode} />
                      </Col>
                  </Row>
                  <Row>
                      <Col xs={10}>

                      </Col>
                  </Row>
              </Grid>
              {
                  editMode && generateForm()
              }
              {
                  !editMode && generateDisplay(script, scrollToRow, scrollToColumnScript, mode, output, done)
              }
          </div>
      )
    };


    return (
        <div className='visualize-main'>
            {done && handleStop()}
            {showError && generateError()}
            {!showError && generateMainScreen()}
        </div>
    )
};

function mapStateToProps(state) {
    return {
        data: state.visualizeReducer.data,
        scrollToColumnScript: state.visualizeReducer.scrollToColumnScript,
        scrollToColumnData: state.visualizeReducer.scrollToColumnData,
        scrollToRow: state.visualizeReducer.scrollToRow,
        editMode: state.visualizeReducer.editMode,
        script: state.visualizeReducer.script,
        inputScript: state.visualizeReducer.inputScript,
        output: state.visualizeReducer.output,
        done: state.visualizeReducer.done,
        showError: state.visualizeReducer.showError
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            ...visualizerActions
        }, dispatch)
    }
}

VisualizerPage.propTypes = {
    data: PropTypes.array.isRequired,
    scrollToColumnScript: PropTypes.number.isRequired,
    scrollToColumnData: PropTypes.number.isRequired,
    scrollToRow: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(VisualizerPage);
