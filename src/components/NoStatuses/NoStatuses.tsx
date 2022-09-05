import { ComponentPropsWithoutRef } from 'react'

const NoStatuses = ({ ...props }: ComponentPropsWithoutRef<'div'>) => {
    return (
        <div {...props}>
            You need to create at least one status to add new tasks
        </div>
    );
}

export default NoStatuses;