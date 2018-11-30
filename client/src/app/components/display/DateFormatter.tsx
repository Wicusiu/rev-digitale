import * as React from 'react';
import * as moment from 'moment';
import { withI18n } from 'react-i18next';

const DateFormatter = ({ date, format, showDate = true, showTime = false, t }: { date: Date, format?: string, showDate?: boolean, showTime?: boolean, t: Function }) => {
  if (date != null) {
    let dateRender = null;
    if (showDate) {
      dateRender = <span className={'up-date-wrapper'}>{moment(date).format(t(format || 'application.dateFormat'))}</span>;
    }
    let timeRender = null;
    if (showTime) {
      timeRender = <span className={'up-time-wrapper'}>{moment(date).format(t(format || 'application.onlyTimeFormat'))}</span>;
    }
    return <>
      {dateRender}
      {timeRender}
    </>;
  }
  return null;
};

export default withI18n()(DateFormatter);
