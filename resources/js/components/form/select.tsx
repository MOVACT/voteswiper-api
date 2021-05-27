import cn from 'classnames';
import React from 'react';

interface Props
    extends React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
    > {
    label?: string;
    error: boolean;
    helperText?: boolean;
}

const Select: React.FC<Props> = ({
    label,
    error,
    helperText,
    children,
    ...restProps
}) => {
    return (
        <div className="form-group mb-3">
            {label && <label className="form-label">{label}</label>}
            <div>
                <select
                    className={cn('form-select', error && ' is-invalid')}
                    {...restProps}
                >
                    {children}
                </select>

                {helperText && (
                    <small className={error ? 'invalid-feedback' : 'form-hint'}>
                        {helperText}
                    </small>
                )}
            </div>
        </div>
    );
};

export default Select;
