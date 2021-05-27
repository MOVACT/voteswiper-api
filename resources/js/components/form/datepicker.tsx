import cn from 'classnames';
import { format } from 'date-fns';
import React from 'react';
import DP from 'react-datepicker';
import createDateFromMysql from '../../util/create-date-from-mysql';

interface Props {
    label?: string;
    error: boolean;
    helperText?: boolean;
    showTimeSelect?: boolean;
    value: string;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    onChange: (date: string) => void;
}

function convertUTCToLocalDate(date: string | Date): Date {
    const newDate = new Date(date);
    return new Date(
        newDate.getUTCFullYear(),
        newDate.getUTCMonth(),
        newDate.getUTCDate(),
        newDate.getUTCHours(),
        newDate.getUTCMinutes(),
        newDate.getUTCSeconds()
    );
}

function convertLocalToUTCDate(date: string | Date): Date {
    const newDate = new Date(date);
    return new Date(
        Date.UTC(
            newDate.getFullYear(),
            newDate.getMonth(),
            newDate.getDate(),
            newDate.getHours(),
            newDate.getMinutes(),
            newDate.getSeconds()
        )
    );
}

const Datepicker: React.FC<Props> = ({
    label,
    error,
    helperText,
    required = false,
    disabled = false,
    id,
    onChange,
    value,
    showTimeSelect = false,
}) => {
    const selected = React.useMemo(() => {
        if (value === '' || !value) return null;
        return convertUTCToLocalDate(createDateFromMysql(value) as Date);
    }, [value]);

    return (
        <div className="form-group mb-3">
            {label && <label className="form-label">{label}</label>}
            <div>
                <DP
                    id={id}
                    required={required}
                    selected={selected}
                    disabled={disabled}
                    className={cn('form-control', error && ' is-invalid')}
                    onChange={(date: Date) => {
                        onChange(
                            format(
                                convertLocalToUTCDate(date),
                                'yyyy-MM-dd HH:mm:ss'
                            )
                        );
                    }}
                    showTimeSelect={showTimeSelect}
                    dateFormat={
                        showTimeSelect ? 'MMMM d, yyyy HH:mm' : undefined
                    }
                />

                {helperText && (
                    <small
                        className={
                            error ? 'invalid-feedback d-block' : 'form-hint'
                        }
                    >
                        {helperText}
                    </small>
                )}
            </div>
        </div>
    );
};

export default Datepicker;
