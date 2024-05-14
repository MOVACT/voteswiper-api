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

const Answer: React.FC<Props> = ({
    label,
    error,
    helperText,
    ...restProps
}) => {
    return (
        <div className="form-group mb-3">
            {label && <label className="form-label">{label}</label>}
            <div>
                <div className="form-selectgroup flex-nowrap w-full">
                    <label className="form-selectgroup-item w-full">
                        <input
                            type="radio"
                            name={restProps.name}
                            value={1}
                            checked={restProps.value === 1}
                            className="form-selectgroup-input"
                            onChange={restProps.onChange}
                        />
                        <span className="form-selectgroup-label">No</span>
                    </label>
                    <label className="form-selectgroup-item w-full">
                        <input
                            type="checkbox"
                            name={restProps.name}
                            value={0}
                            checked={restProps.value === 0}
                            className="form-selectgroup-input"
                            onChange={restProps.onChange}
                        />
                        <span className="form-selectgroup-label">
                            No Answer
                        </span>
                    </label>
                    <label className="form-selectgroup-item w-full">
                        <input
                            type="checkbox"
                            name={restProps.name}
                            value={2}
                            checked={restProps.value === 2}
                            className="form-selectgroup-input"
                            onChange={restProps.onChange}
                        />
                        <span className="form-selectgroup-label">Yes</span>
                    </label>
                </div>
                {helperText && (
                    <small className={error ? 'invalid-feedback' : 'form-hint'}>
                        {helperText}
                    </small>
                )}
            </div>
        </div>
    );
};

export default Answer;
