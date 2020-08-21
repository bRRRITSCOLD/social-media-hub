// node_modules
import React from 'react';
import classNames from 'classnames';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';

// styles
import { userCustomTabsCardStyles } from './CustomTabsCard.styles';

// componenets
// import CardBody from 'components/Card/CardBody.js';
import { Card } from './Card';
import { CardHeader } from './CardHeader';

export function CustomTabsCard(props: {
  children?: any;
  title: string;
  tabs: {
    name: string;
    icon: any;
    content: JSX.Element;
  }[];
  rtlActive?: any;
}): JSX.Element {
  // deconstruct for ease
  const {
    children,
    title,
    tabs,
    rtlActive,
  } = props;
  // styles
  const customTabsCardStyles = userCustomTabsCardStyles();
  const [value, setValue] = React.useState(0);
  const cardTitle = classNames({
    [customTabsCardStyles.cardTitle]: true,
    [customTabsCardStyles.cardTitleRTL]: rtlActive,
  });
  // local handlers
  const handleChange = (event: any, v: any) => {
    setValue(v);
  };
  // render
  return (
    <Card>
      <CardHeader>
        <div className={cardTitle}>{title}</div>
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            root: customTabsCardStyles.tabsRoot,
            indicator: customTabsCardStyles.displayNone,
            scrollButtons: customTabsCardStyles.displayNone,
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab: any, i: number) => {
            let icon = {};
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (tab.icon) {
              icon = {
                icon: <tab.icon />,
              };
            }
            return (
              <Tab
                classes={{
                  root: customTabsCardStyles.tabRootButton,
                  selected: customTabsCardStyles.tabSelected,
                  wrapper: customTabsCardStyles.tabWrapper,
                }}
                key={i as any}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                label={tab.name}
                {...icon}
              />
            );
          })}
        </Tabs>
      </CardHeader>
      {children}
      <div>
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key as any}>{prop.content}</div>;
          }
          return null;
        })}
      </div>
      {/* <CardBody>
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardBody> */}
    </Card>
  );
}

// CustomTabs.propTypes = {
//   headerColor: PropTypes.oneOf([
//     'warning',
//     'success',
//     'danger',
//     'info',
//     'primary',
//     'rose',
//   ]),
//   title: PropTypes.string,
//   tabs: PropTypes.arrayOf(
//     PropTypes.shape({
//       tabName: PropTypes.string.isRequired,
//       tabIcon: PropTypes.object,
//       tabContent: PropTypes.node.isRequired,
//     }),
//   ),
//   rtlActive: PropTypes.bool,
//   plainTabs: PropTypes.bool,
// };
