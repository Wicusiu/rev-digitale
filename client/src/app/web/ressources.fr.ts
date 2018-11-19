
if (!String.format) {
  String.format = function (val: string, ...args: string[]) {
    return val.replace(/{(\d+)}/g, (match, num) => {
      return typeof args[num] !== 'undefined'
          ? args[num]
          : match
        ;
    });
  };
}

export const frRessources = {
  application : {
    dateFormat:'DD/MM/YYYY',
    dateTimeFormat:'DD/MM/YYYY [à] H:mm:ss',
  },
  web : {
    applicationName : 'UpCitiz',
    // Labels
    cancelLabel : 'ANNULER',
    confirmLabel: 'CONFIRMER',
    closeLabel: 'FERMER',
    // Titles
    confirmationTitle : 'Confirmation',
    moreInfoTitle: 'Plus d\'informations',
    // Messages

  },
};
