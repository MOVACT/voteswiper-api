import cn from 'classnames';
import React from 'react';

interface Props
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label: string;
    error: boolean;
    helperText?: boolean;
}

const Toggle: React.FC<Props> = ({
    label,
    error,
    helperText,
    ...restProps
}) => {
    return (
        <div className="form-group mb-3">
            <label
                className={cn('form-check form-switch', error && 'is-invalid')}
            >
                <input
                    className="form-check-input"
                    type="checkbox"
                    {...restProps}
                />
                <span className="form-check-label">{label}</span>
            </label>
            {helperText && (
                <small className={error ? 'invalid-feedback' : 'form-hint'}>
                    {helperText}
                </small>
            )}
        </div>
    );
};

export default Toggle;
