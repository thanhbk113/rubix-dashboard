import { Dropdown } from '@mui/base';
import Menu from '@mui/base/Menu';
import MenuButton from '@mui/base/MenuButton';
import MenuItem from '@mui/base/MenuItem';
export default function MyApp() {
  return (
    <Dropdown>
      <MenuButton>Settings</MenuButton>
      <Menu>
        <MenuItem>My account</MenuItem>
        <MenuItem>Notification preferences</MenuItem>
      </Menu>
    </Dropdown>
  );
}
