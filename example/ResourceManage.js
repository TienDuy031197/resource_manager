import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch, Link, Navlink
} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Basic from './Basic';
import CrudResource from './CrudResource';
const { Header, Content, Footer, Sider } = Layout;
class ResourceManage extends Component {
    render() {
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <img style={{ height: '65px', padding: '0px !important', border: '0px !important' }} src='data:image/png;base64,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' className="img-thumbnail"></img>
                        <Menu.Item key="1">
                            <Icon type="home" />
                            {/* <span className="nav-text">Home</span> */}
                            <Navlink to="/" className="nav-text active">Home</Navlink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="user" />
                            {/* <span className="nav-text">Resource</span> */}
                            {/* <Link className="" target="_self"
                                to='/crudresource'>
                                <span className="nav-text">Resource</span>
                            </Link> */}
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="project" />
                            <span className="nav-text">Project</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="solution" />
                            <span className="nav-text">Task</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 500 }}>
                            <Switch>
                                <Route exact path="/" component={Basic} />
                                {/* <Route path="/crudresource" component={CrudResource} /> */}
                                {/* <Route component={NotFound} /> */}
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default ResourceManage;