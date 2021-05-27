import cn from 'classnames';
import React from 'react';
import locales from '../../config/locales';

interface Props {
    label: string;
    error: boolean;
    disabled?: boolean;
    helperText?: boolean;
    value: string[];
    onChange: (translations: string[]) => void;
}

const Translations: React.FC<Props> = ({
    label,
    error,
    helperText,
    disabled = false,
    onChange,
    value,
}) => {
    return (
        <div className="form-group mb-3">
            {label && <label className="form-label">{label}</label>}
            {Object.keys(locales).map((loc) => {
                return (
                    <label
                        key={loc}
                        className={cn(
                            'form-check form-check-inline',
                            error && 'is-invalid'
                        )}
                    >
                        <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={(e) => {
                                const newTranslations = value;

                                if (
                                    e.target.checked &&
                                    value.indexOf(loc) === -1
                                ) {
                                    newTranslations.push(loc);
                                } else if (
                                    !e.target.checked &&
                                    value.indexOf(loc) > -1
                                ) {
                                    newTranslations.splice(
                                        newTranslations.indexOf(loc),
                                        1
                                    );
                                }

                                onChange(newTranslations);
                            }}
                            checked={value.indexOf(loc) > -1 || loc === 'en'}
                            disabled={disabled || loc === 'en'}
                        />
                        <span className="form-check-label">
                            {locales[loc].label}
                        </span>
                    </label>
                );
            })}
            {helperText && (
                <small className={error ? 'invalid-feedback' : 'form-hint'}>
                    {helperText}
                </small>
            )}
        </div>
    );
};

export default Translations;
