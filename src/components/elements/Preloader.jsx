import React from "react"
import logo from './../../media/reaload4.svg'
import styles from './preloader.module.css'

const Preloader = () => {
    return <div className= {styles.loading}>
        <img src={logo} />
    </div>
}

export default Preloader