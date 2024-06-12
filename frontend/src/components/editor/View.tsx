import {Row, Col} from "antd"

const View = ({mail} : {mail: string}) => {
    return (
        <div className="h-full w-full">
            <Row className="h-1/3">
                <Col span={8} className="h-full">col-8</Col>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
            </Row>
            <Row>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
            </Row>
            <Row>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
            </Row>
        </div>
    )
}

export default View  