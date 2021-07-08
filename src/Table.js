import React, { useCallback, useEffect ,useState} from 'react';
import {Space,Button,Layout,Row,Col,Table,message,Modal} from 'antd';
import {DeleteOutlined,EditOutlined,CopyOutlined} from '@ant-design/icons'
import { Content,  Header } from 'antd/lib/layout/layout';
import useProject, { useItems } from './useProject';
import { useHistory } from 'react-router';
import useRule from './useRule';

function RulesTable(){
    const [{list},{getList}]=useProject();
    const [{},{deleteRule}]=useRule()
    const history=useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [deleteid,setDeleteid]=useState(0);

    useEffect(()=>{
        const hide=message.success('Loading...',0)
        getList().then(
            setTimeout(hide, 1000)
        );
    },[]);

    const handleNewRules=useCallback(()=>{
        history.push('/NewRules')
    })

    
    const showModal = useCallback(() => {
        setIsModalVisible(true);
  });

    const handleOk = async () => {
        console.log(deleteid);
        await deleteRule(deleteid);
        await getList();
        setIsModalVisible(false);
        console.log('huoquzhihou',list);
  }

    const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  })

    const handleDelete=useCallback((_id)=>{
        setDeleteid(_id);
        showModal();
        //if(isConfirmed){
          //  deleteRule(_id);
            //setIsComfirmed(false);
            //getTable();
        //}       
    })


    const handleEdit=useCallback((_id)=>{
        const url='/EditRules?_id='+_id
        history.push(url);
    })
    const handleCopy=useCallback((_id)=>{
        const url='/CopyRules?_id='+_id
        history.push(url);
    })
    const columns = [   
        {
          title: 'NAME',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'DESCRIPTION',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'CREATE TIME',
          dataIndex: 'create_time',
          key: 'create_time',
        },
        {
            title:'ACTIONS',
            dataIndex:'actions',
            key:'actions',
            render:(text,record)=>
            (
                <Space size='small'>
                    <Button 
                    onClick={()=>handleEdit(record._id)}
                    icon={<EditOutlined/>} 
                    type='link' 
                    />
                    <Button 
                    onClick={()=>handleDelete(record._id)}
                    icon={<DeleteOutlined/>} 
                    type='link'
                    />
                    <Button 
                    onClick={()=>handleCopy(record._id)}
                    icon={<CopyOutlined/>} 
                    type='link'  
                    />
                </Space>
            )
        }
    ];


       return (
        <Layout>
            <Header>
                <Row>
                    <Col>Manage Rules</Col>
                    <Col offset={19}>
                        <Button 
                        type='primary'
                        onClick={handleNewRules}
                        >New Rules
                        </Button>
                    </Col>
                </Row>
            </Header>
            <Content>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>确认删除？</p>
            </Modal>
                <Table columns={columns} dataSource={list}>
                </Table>
            </Content>
        </Layout>
        );
}
export default RulesTable;