import { useCallback } from "react";
import BodyContainer from "../../BodyContainer";
import Button from "../../Button";
import Container from "../../Container";


interface DashboardFormProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const DashboardForm: React.FC<DashboardFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }
        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }
  
    return (
    <>
        <Container>
            
            <div className="flex items-center justify-center">
                <div className="text-lg text-center font-semibold">
                    {title}
                </div>
            </div>

            <div className="relative flex-auto">
                {body}
            </div>

            <div className="flex flex-col gap-2 p-6">
                <div
                    className="
                        flex
                        flex-row
                        items-center
                        gap-4
                        w-full
                        md:w-1/2
                        mx-auto
                    "
                >
                    {secondaryAction && secondaryActionLabel && (
                        <Button
                            disabled={disabled}
                            label={secondaryActionLabel}
                            onClick={secondaryAction}
                            small={false}

                        />
                    )}

                    <Button 
                        disabled={disabled}
                        label={actionLabel}
                        onClick={handleSubmit}
                    />
                </div>
                {footer}
            </div>
        </Container>
    </>
  )
}

export default DashboardForm