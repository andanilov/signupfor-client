import { useLocation } from 'react-router-dom';
import { ILocationState } from '../routes';

export default class NavigateService {
  static shiftLocationState = () => {
    const location = useLocation()?.state as ILocationState;
    NavigateService.clearLocationState();
    return location;
  };

  static clearLocationState = () => { window.history.replaceState({}, document.title); };
}
