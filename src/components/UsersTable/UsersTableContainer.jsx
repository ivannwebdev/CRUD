import React, { useEffect } from "react"
import styles from './usersTableContainer.module.css'
import { Table, Modal, Input, Button} from 'antd';
import {DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { API } from "../../api/api";
import { connect } from "react-redux";
import { editUserCreator, getUsersCreator, removeUserCreator, editingPersonCreator, highlightFieldCreator, setIsAddCreator, setNewUserCreator, addUserCreator } from "../../store/reducers/usersReducer";
import Preloader from "../elements/Preloader";
import { isEditCreator } from './../../store/reducers/usersReducer';
import { useInput } from '../../hooks/useInput';



const UsersTable = (props) => {

  const addNameInput = useInput('', {isEmpty: true})
  const addEmailInput = useInput('', {isEmpty: true})
  const addWebsiteInput = useInput('', {isEmpty: true})
  const addCompanyInput = useInput('', {isEmpty: true})

  const editNameInput = useInput('' ,{isEmpty: true})
  const editEmailInput = useInput('', {isEmpty: true})
  const editWebsiteInput = useInput('',{isEmpty: true})
  const editCompanyInput = useInput('', {isEmpty: true})

  const getHighlight = (arr, el) => {
    for (const i of arr) {
        if(i === el) return i
    }
  }

  const onRemove = (user) => {
    Modal.confirm({
      title:'Are you shure, you want to delete this person?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        props.removeUserCreator(user.id)
      }
    })
  }

  const onEdit = (user) => {
    props.isEditCreator(true)
    props.editingPersonCreator(user)
    editNameInput.setValue(user.name)
    editEmailInput.setValue(user.email)
    editWebsiteInput.setValue(user.website)
    editCompanyInput.setValue(user.company)

  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: name => <div style= {(props.highlightField && getHighlight(props.highlightField, name) === name) ? {color: 'coral'} : {}}>{name}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: email => <div style= {(props.highlightField && getHighlight(props.highlightField, email) === email) ? {color: 'coral'} : {}}>{email}</div>
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    render: website => <div style= {(props.highlightField && getHighlight(props.highlightField, website) === website) ? {color: 'coral'} : {}}>{website}</div>
    },
    {
      title: 'Company',
      key: 'company',
      dataIndex: 'company',
      render: company =>  <div style= {(props.highlightField && getHighlight(props.highlightField, company) === company) ? {color: 'coral'} : {}}>{company}</div>
    
    },
    {
      title: 'Action',
      key: 'action',
      render: (el) => (
        <>
          <EditOutlined className= {styles.edit} onClick= {() => onEdit(el)}/>
          <DeleteOutlined className= {styles.remove}  onClick= {() => onRemove(el)} />
          <Modal
            mask= {false}
            title= 'Edit person info'
            visible= {props.isEdit}
            okText= 'Save'
            onCancel= {() => {
              props.isEditCreator(false)
            }}
            onOk= {() => {
              props.isEditCreator(false)
              if(editNameInput.isEmpty) return
              if(editEmailInput.isEmpty) return
              if(editWebsiteInput.isEmpty) return
              if(editCompanyInput.isEmpty) return
              props.editingPersonCreator({
                ...props.editingPerson,
                name: editNameInput.value,
                email: editEmailInput.value,
                website: editWebsiteInput.value,
                company: editCompanyInput.value
              })
              props.highlightFieldCreator()
              props.editUserCreator()
              editNameInput.setValue('')
              editEmailInput.setValue('')
              editWebsiteInput.setValue('')
              editCompanyInput.setValue('')
              
              
            }}
          >
            <div className= {styles.editItem}>Name</div>
            <Input 
              onBlur= {e => editNameInput.onBlur(e)}
              onChange= {(e) => editNameInput.onChange(e)} 
              value= {editNameInput.value}
            />
            {(editNameInput.isDirty && editNameInput.isEmpty) && <div style= {{color: 'red'}}>Not empty</div>}
            <div className= {styles.editItem}>Email</div>
            <Input 
              onBlur= {e => editEmailInput.onBlur(e)}
              onChange= {(e) => editEmailInput.onChange(e)} 
              value= {editEmailInput.value}
            />
            {(editEmailInput.isDirty && editEmailInput.isEmpty) && <div style= {{color: 'red'}}>Not empty</div>}
            <div className= {styles.editItem}>Website</div>
            <Input 
              onBlur= {e => editWebsiteInput.onBlur(e)}
              onChange= {(e) => editWebsiteInput.onChange(e)} 
              value= {editWebsiteInput.value}
            />
            {(editWebsiteInput.isDirty && editWebsiteInput.isEmpty) && <div style= {{color: 'red'}}>Not empty</div>}
            <div className= {styles.editItem}>Company</div>
            <Input 
              onBlur= {e => editCompanyInput.onBlur(e)}
              onChange= {(e) => editCompanyInput.onChange(e)} 
              value= {editCompanyInput.value}
            />
            {(editCompanyInput.isDirty && editCompanyInput.isEmpty) && <div style= {{color: 'red'}}>Not empty</div>}
          </Modal>
          <Modal
            mask= {false}
            title= 'New person'
            visible= {props.isAdd}
            okText= {'Add'}
            onOk= {() => {
              props.setIsAddCreator(false)
              if(addNameInput.isEmpty) return
              if(addEmailInput.isEmpty) return
              if(addWebsiteInput.isEmpty) return
              if(addCompanyInput.isEmpty) return
              props.addUserCreator({
                key: Math.random(),
                name: addNameInput.value,
                email: addEmailInput.value,
                website: addWebsiteInput.value,
                company: addCompanyInput.value
              })
              addNameInput.setValue('')
              addEmailInput.setValue('')
              addWebsiteInput.setValue('')
              addCompanyInput.setValue('')
              
            }}
            onCancel= {() => {
              props.setIsAddCreator(false)
            }}
          >
            <div>Name</div>
            <Input 
              onBlur= {e => addNameInput.onBlur(e)}
              onChange= {(e) => {
                addNameInput.onChange(e)
              }} 
              value= {addNameInput.value}
            />
            {(addNameInput.isEmpty && addNameInput.isDirty) && <div style= {{color: 'red'}}>Not empty</div>}
            <div className= {styles.editItem}>Email</div>
            <Input 
              onBlur= {e => addEmailInput.onBlur(e)}
              onChange= {(e) => addEmailInput.onChange(e)} 
              value= {addEmailInput.value}
            />
            {(addEmailInput.isEmpty && addEmailInput.isDirty) && <div style= {{color: 'red'}}>Not empty</div>}
            <div className= {styles.editItem}>Website</div>
            <Input 
              onBlur= {e => addWebsiteInput.onBlur(e)}
              onChange= {(e) => addWebsiteInput.onChange(e)} 
              value= {addWebsiteInput.value}
            />
            {(addWebsiteInput.isEmpty && addWebsiteInput.isDirty) && <div style= {{color: 'red'}}>Not empty</div>}
            <div className= {styles.editItem}>Company</div>
            <Input 
              onBlur= {e => addCompanyInput.onBlur(e)}
              onChange= {(e) => addCompanyInput.onChange(e)} 
              value= {addCompanyInput.value}
            />
            {(addCompanyInput.isEmpty && addCompanyInput.isDirty) && <div style= {{color: 'red'}}>Not empty</div>}
          </Modal>
        </>
      ),
    }
  ]

    useEffect(() => {
      
        
          API.getUsers().then( res => {
              const data = res.map( (el, i )=> el = {
                key: i,
                id: el.id,
                name: el.name,
                email: el.email,
                website: el.website,
                company: el.company.name
              })

              props.getUsersCreator(data)
            }
          )
      
      
    }, [])

    window.value = editEmailInput.value

    if(!props.data.users) return <Preloader />
    return <div>
      
        <Table columns= {columns} dataSource= {props.data.users}/>
      
        <Button className= {styles.button} onClick= {() => props.setIsAddCreator(true)}>Add user</Button>
      
      </div>
    
  }

const mapStateToProps = (state) => ({
    data: state.users,
    isEdit: state.users.isEdit,
    editingPerson: state.users.editingPerson,
    highlightField: state.users.highlightField,
    isAdd: state.users.isAdd,
    newUser: state.users.newUser
})

export default connect(mapStateToProps, {
  getUsersCreator,
  editUserCreator, 
  removeUserCreator,
  isEditCreator,
  editingPersonCreator,
  highlightFieldCreator,
  setIsAddCreator,
  setNewUserCreator,
  addUserCreator
})(UsersTable)