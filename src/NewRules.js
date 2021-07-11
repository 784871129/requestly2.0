import { Button, Col, Input, Row, Form,notification} from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import { useCallback,useState } from "react";
import {PlusCircleOutlined} from '@ant-design/icons'
import { useHistory} from "react-router-dom";
import useRule from './useRule';
import Item from './Item'
import {debounce} from 'lodash'


function NewRules(props){
    const [{rule},{setRule,createRule,updateItemsofRule}]=useRule();
    const history=useHistory();
    const [index,setIndex]=useState(0);

    const handleClose=useCallback(()=>{
        history.push('/Table');
    },[])

    const handleDelete=useCallback((index)=>{
        setRule((rule)=>{
            return {
                name:rule.name,
                des:rule.des,
                items:[
                    ...rule.items.filter((item)=>item.index!==index)
                ]
            }
        });
    },[])
    const handleNewItem=()=>{
        const emptyItem={
            index:index+1,
            header:'',  
            value:'',
            url:''
        };
        setIndex(index+1);
        setRule((rule)=>{
            return {
                name:rule.name,
                des:rule.des,
                items:[...rule.items,emptyItem]
            }
        })
    }

    const handleFinished=useCallback((values) => {
        if(values.name.length!==0&&rule.items.every((item)=>(item.header.length!==0&&item.value.length!==0))){
            createRule(values.name,values.description);
        }else{
            notification.open({
            message:'必要字段为空',
            description:
            '请输入必要字段，包括规则的名称、请求头和请求头的值'
            });
            return;
        }            
      },[]);
      
    const itemComponent=()=>{   
        return rule.items.map((item)=>{
            return <Item data={item} key={item.index} index={item.index} handleDelete={handleDelete} handleItemDataChange={handleItemDataChange} />
        })
    }

    const handleItemDataChange=useCallback(debounce((index,allChangedValues)=>{
        console.log(allChangedValues);
        allChangedValues.index=index;
        updateItemsofRule(allChangedValues);
    },1000),[])
    
    return(     
         <Layout>
             <Form name='new_rule' initialValues={{
                 name:rule.name,
                 description:rule.des
             }} 
             layout={'horizontal'}
             onFinish={handleFinished}
             >
             <Header>
                 <Row style={{padding:14}}>
                     <Col span={3} offset={18}>
                        <Form.Item name='create_rule'>
                         <Button 
                         type='primary'
                         htmlType='submit'                    
                         >
                        Create Rules
                        </Button>                  
                        </Form.Item>
                        </Col>
                        <Col span={2}>
                        <Form.Item name='close' labelCol={{span:3}}>
                        <Button 
                         type='primary'
                         onClick={handleClose}
                         >
                        Close
                        </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Header>
            <Row style={{marginTop:10}}>
                <Col span={6} offset={5}>
                    <Form.Item name='name'>
                    <Input 
                    placeholder='Rule Name' 
                    />
                    </Form.Item>
                </Col>
                <Col span={5} >
                    <Form.Item name='description'>      
                    <Input 
                    placeholder='Description(Optional)' 
                    style={{marginLeft:10,width:300}} 
                    />
                    </Form.Item>
                </Col>
                <Col >
                    <Form.Item name='add_pairs'>
                    <Button 
                         type='primary'
                         icon={<PlusCircleOutlined />}
                         onClick={handleNewItem}
                         style={{marginLeft:150}}
                         >
                        Add Pairs
                    </Button>
                    </Form.Item>
                </Col>  
            </Row>
            </Form>
            <Content style={{alignSelf:'center'}}>
                {itemComponent()}
            </Content>
        </Layout>
           
    )
}
export default NewRules;    