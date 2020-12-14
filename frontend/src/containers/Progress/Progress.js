import React, {useState} from 'react'
import axios from 'axios'
import { Container, Row, Col, ProgressBar, Button } from "react-bootstrap";

function later(delay) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
}

const LOADING = "LOADING"
const PROCESSING = "PROCESSING"
const SUCCESS = "SUCCESS"

const Progress = () => {
    const [processStatus, setProcessStatus] = useState()
    const [taskId, setTaskId] = useState()
    const [progress, setProgress] = useState(0)
    const [, updateState] = useState()

    const onClickProgress = () => {
        axios
            .post("api/progress/set")
            .then(({data}) => {
                setTaskId(data.id)
                setProcessStatus(PROCESSING)
            })
            .catch((e) => console.log(e))
    
        setProcessStatus(LOADING)
    }

    if(processStatus === PROCESSING && progress !== 100){
        later(500).then(() => axios.post("api/progress/check", { taskId })).then(({data}) => {
            if(data.state === SUCCESS) {
                setProgress(100)
            } else if(data.result){
                setProgress(data.result.current)
            } else {
                updateState({})
            }
        }).catch((e) => console.log(e))
    } else if (processStatus === SUCCESS) {
        setProgress(100)
    }

    return <Container>
        <Row className="justify-content-md-center p-3">
            <Col md={12}>
                <ProgressBar animated now={progress} />
            </Col>
            <Col md={12}>
                <div className="d-flex justify-content-center p-3" onClick={onClickProgress}>
                    <Button>{processStatus === LOADING ? "Loading..." : "Go!"}</Button>
                </div>
            </Col>
        </Row>
    </Container>
}

export default Progress