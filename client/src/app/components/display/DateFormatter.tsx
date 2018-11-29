import * as React from 'react';
import * as moment from 'moment';

import { Localize, I18n } from 'react-redux-i18n';

const DateFormatter = ({ date, format }: { date: Date, format?: string }) => date != null ? <Localize value={moment(date).format()} dateFormat={format || I18n.t('application.dateFormat')} /> : null;

export default DateFormatter;
