interface NoStatusesProps {
    elemStyles: string
}

const NoStatuses = ({ elemStyles }: NoStatusesProps) => {
    return (
        <div className={elemStyles}>
            You need to create at least one status to add new tasks
        </div>
    );
}

export default NoStatuses;