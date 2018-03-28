import React, { Component } from 'react'
import { Card, Col, Row } from 'antd';

class Common extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // const { payroll, web3 } = this.props;
    // const updateInfo = (error, result) => {
    //   if (!error) {
    //     this.checkInfo();
    //   }
    // }

    // // this.getPaid = payroll.GetPaid(updateInfo);
    // // this.updateEmployee = payroll.UpdateEmployee(updateInfo);
    // // this.removeEmployee = payroll.RemoveEmployee(updateInfo);

    // this.checkInfo();

    this.timer = setInterval(() => {
        this.checkInfo()

    },1000)
  }

  componentWillUnmount() {
      clearInterval(this.timer)
    // this.getPaid.stopWatching();
    // this.updateEmployee.stopWatching();
    // this.removeEmployee.stopWatching();
  }

  checkInfo = () => {
    const { payroll, account, web3 } = this.props;
    payroll.checkInfo.call({
      from: account,
    }).then((result) => {
      this.setState({
        balance: web3.fromWei(result[0].toNumber()),
        runway: result[1].toNumber(),
        employeeCount: result[2].toNumber()
      })
    });
  }

  render() {
    const { runway, balance, employeeCount } = this.state;
    return (
      <div>
        <h2>通用信息</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="合约金额">{balance} Ether</Card>
          </Col>
          <Col span={8}>
            <Card title="员工人数">{employeeCount}</Card>
          </Col>
          <Col span={8}>
            <Card title="可支付次数">{runway}</Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Common