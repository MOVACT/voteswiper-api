import cn from 'classnames';
import React from 'react';

interface Props
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label?: string;
    error: boolean;
    helperText?: string | React.ReactNode;
}

const Input: React.FC<Props> = ({ label, error, helperText, ...restProps }) => {
    return (
        <div className="form-group mb-3">
            {label && <label className="form-label">{label}</label>}
            <div>
                <input
                    type="text"
                    className={cn('form-control', error && ' is-invalid')}
                    {...restProps}
                />
                {helperText && (
                    <small className={error ? 'invalid-feedback' : 'form-hint'}>
                        {helperText}
                    </small>
                )}
            </div>
        </div>
    );
};

export default Input;
