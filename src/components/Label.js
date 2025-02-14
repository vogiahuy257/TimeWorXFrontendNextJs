const Label = ({ className, children, ...props }) => (
    <label className={`${className}`} {...props}>
        {children}
    </label>
)

export default Label
