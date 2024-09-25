import { type FC, type SVGProps } from 'react';

import Add from './Add';
import Alert from './Alert';
import Arrow from './Arrow';
import Bookmark from './Bookmark';
import Check from './Check';
import Clear from './Clear';
import Clock from './Clock';
import Copy from './Copy';
import Correct from './Correct';
import Delete from './Delete';
import Dish from './Dish';
import Edit from './Edit';
import Facebook from './Facebook';
import Filter from './Filter';
import Google from './Google';
import Home from './Home';
import Image from './Image';
import List from './List';
import Login from './Login';
import Logout from './Logout';
import Next from './Next';
import Others from './Others';
import Person from './Person';
import Pin from './Pin';
import Profile from './Profile';
import RemoveBookmark from './RemoveBookmark';
import Reviews from './Reviews';
import Search from './Search';
import Send from './Send';
import Settings from './Settings';
import Share from './Share';
import Star from './Star';
import Warning from './Warning';

export type IconNames =
    | 'Add'
    | 'Alert'
    | 'Arrow'
    | 'Bookmark'
    | 'Check'
    | 'Clear'
    | 'Clock'
    | 'Copy'
    | 'Correct'
    | 'Delete'
    | 'Dish'
    | 'Edit'
    | 'Facebook'
    | 'Filter'
    | 'Google'
    | 'Home'
    | 'Image'
    | 'List'
    | 'Login'
    | 'Logout'
    | 'Next'
    | 'Others'
    | 'Person'
    | 'Pin'
    | 'Profile'
    | 'RemoveBookmark'
    | 'Reviews'
    | 'Search'
    | 'Send'
    | 'Settings'
    | 'Share'
    | 'Star'
    | 'Warning'
    | undefined;

type IconProps = SVGProps<SVGSVGElement> & {
    name: IconNames;
};

const icons = {
    Add,
    Alert,
    Arrow,
    Bookmark,
    Check,
    Clear,
    Clock,
    Copy,
    Correct,
    Delete,
    Dish,
    Edit,
    Facebook,
    Filter,
    Google,
    Home,
    Image,
    List,
    Login,
    Logout,
    Next,
    Others,
    Person,
    Pin,
    Profile,
    RemoveBookmark,
    Reviews,
    Search,
    Send,
    Settings,
    Share,
    Star,
    Warning,
};

const Icon: FC<IconProps> = ({ name, ...props }) => {
    if (!name) return null;

    const IconComponent = icons[name];

    return <IconComponent {...props} />;
};

export default Icon;
