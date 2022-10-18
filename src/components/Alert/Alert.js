import {useContext} from 'react'
import MainContext from '../../context/MainContext'
import "./Alert.css"

const Alert = () => {
const {alert} = useContext(MainContext)
  return alert && <div className='alert'>{alert}</div>
}

export default Alert