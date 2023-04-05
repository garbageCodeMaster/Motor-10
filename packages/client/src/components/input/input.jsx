import styles from './input.module.css'

const Input = (props) => {

    const inputStyle = props.className ? `${styles.input} ${props.className}` : styles.input

    return (
        <input
          className={inputStyle}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          name={props.name}
        />
    )
}

export default Input
