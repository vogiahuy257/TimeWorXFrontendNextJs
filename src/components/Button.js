const Button = ({ type = 'submit', className, ...props }) => (
    <button type={type} className={`${className} btn`} {...props} />
)

export default Button
