const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(response => {
    console.log(response);
    if (response.success) {
        location.reload();
    };
});

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();
function renewStocks(data) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(data);
}
ApiConnector.getStocks(response => {
    if (response.success) {
        renewStocks(response.data);
        setInterval(() => {
            renewStocks(response.data);
        }, 60000);
    }
});

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {        
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}
favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {        
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}