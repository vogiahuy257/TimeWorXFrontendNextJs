const Button = ({ type = 'submit', className, ...props }) => (
    <button
        type={type}
        className={`${className} `}
        {...props}
    />
)

export default Button
