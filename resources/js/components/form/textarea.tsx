import cn from 'classnames';
import React from 'react';

interface Props
    extends React.DetailedHTMLProps<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    > {
    label?: string;
    error: boolean;
    helperText?: boolean;
}

const Textarea: React.FC<Props> = ({
    label,
    error,
    helperText,
    ...restProps
}) => {
    return (
        <div className="form-group mb-3">
            {label && <label className="form-label">{label}</label>}
            <div>
                <textarea
                    rows={4}
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

export default Textarea;
