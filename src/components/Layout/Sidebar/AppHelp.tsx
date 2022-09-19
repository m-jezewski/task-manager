import HelpModal from "../../Modals/HelpModal/HelpModal";
import APP_DEFAULTCONTENT from '../../../assets/helpModalAssets/APP-DEFAULTCONTENT.webp'
import APP_DIAGRAM_SPACES from '../../../assets/helpModalAssets/APP-DIAGRAM-SPACES.webp'
import APP_DIAGRAM_STATUSES from '../../../assets/helpModalAssets/APP-DIAGRAM-STATUSES.webp'
import APP_DIAGRAM_TASKS from '../../../assets/helpModalAssets/APP-DIAGRAM-TASKS.webp'
import APP_DIAGRAM from '../../../assets/helpModalAssets/APP-DIAGRAM.webp'
import APP_GOALS from '../../../assets/helpModalAssets/APP-GOALS.webp'
import APP_HELP from '../../../assets/helpModalAssets/APP-HELP.webp'
import APP_LOGO from '../../../assets/helpModalAssets/APP-LOGO.webp'
import styles from './Sidebar.module.scss'

const appHelpContent = [
    {
        title: 'Task Manager',
        description: "Task Manager is an application to manage your daily tasks and track bigger goals. Now let's try to explain the main concepts of the application: Spaces, Statuses and Tasks.",
        img: {
            src: APP_LOGO,
            alt: '"Task Manager" App logo',
        },
    },
    {
        title: 'Spaces - Statuses - Tasks',
        description:
            'Spaces are "containers" with statuses and tasks, you can use them to part your content thematically. E.g.  Split different parts of your work or separate work tasks from household chores. Although using just one space for everything is also completely fine.',
        img: {
            src: APP_DIAGRAM_SPACES,
            alt: 'diagram with spaces, statuses and tasks',
        },
    },
    {
        title: 'Spaces - Statuses - Tasks',
        description: 'Statuses are smaller "boxes" inside of spaces, by design I wanted them to define "status" as task progress phase, but as a user you can name and use all elements of the application as you see fit',
        img: {
            src: APP_DIAGRAM_STATUSES,
            alt: 'diagram with spaces, statuses and tasks',
        },
    },
    {
        title: 'Spaces - Statuses - Tasks',
        description: 'Tasks are elements containing your daily pieces of work. These are displayed in list, panel and calendar pages. Each has its own subpage which you can enter by clicking on a specific task',
        img: {
            src: APP_DIAGRAM_TASKS,
            alt: 'diagram with spaces, statuses and tasks',
        },
    },
    {
        title: 'Spaces - Statuses - Tasks',
        description: 'Feel free to add as many spaces, statuses and tasks as you want. You can create and delete new spaces in Dashboard, new statuses in Panel or List pages.',
        img: {
            src: APP_DIAGRAM,
            alt: 'diagram with spaces, statuses and tasks',
        },
    },
    {
        title: 'Help',
        description: 'Each page contains a short presentation of its functionality. Open it by clicking on the "?" icon in upper right corner.',
        img: {
            src: APP_HELP,
            alt: ' "?" icon ',
        },
    },
    {
        title: 'Goals',
        description: 'App also offers possibility to track larger goals and their progress in the goals page',
        img: {
            src: APP_GOALS,
            alt: 'Goal links',
        },
    },
    {
        title: 'Default Content',
        description:
            'For purpose of presenting the application I loaded some basic content after creating your account. You can modify it, or easily delete basic spaces in the Dashboard page and configure everything from scratch if you want. I hope you will enjoy my app!',
        img: {
            src: APP_DEFAULTCONTENT,
            alt: 'Table filled with tasks',
        },
    },
]


const AppHelp = () => {
    return (
        <HelpModal
            slidesContent={appHelpContent}
            buttonStyles={styles.openHelp}
            id='appHelpModal'
        />
    );
}

export default AppHelp;