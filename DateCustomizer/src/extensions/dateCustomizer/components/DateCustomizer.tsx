
import * as React from 'react';
import { Dialog } from '@microsoft/sp-dialog';

import styles from './DateCustomizer.module.scss';

export interface IDateCustomizerProps {
  text: string;
  productTitle: string;
}

/* This component is used to render the date in the list view
- We create a custom component to show the date, the day of the week, and the product title
- We also add an onClick event to show an alert when the date is clicked
- Since this component is a React component, we can use any React component library, hooks, complex logic, etc.
*/
const DateCustomizer: React.FC<IDateCustomizerProps> = (props) => {

  // Get the day of the week from a date string
  const getDayOfTheWeek = (date: string) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = new Date(date).getDay();
    return days[day];
  }

  // Show an alert when the date is clicked
  const onClickDate = async () => {
    return Dialog.alert(`You clicked on ${props.text} (${getDayOfTheWeek(props.text)})`)
  };

  return (
    <div className={styles.dateCustomizer} onClick={onClickDate}>
      <div>
        Title: {props.productTitle}
      </div>
      Date: {props.text} ({getDayOfTheWeek(props.text)})
    </div>
  );
};

export default DateCustomizer;
