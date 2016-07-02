FlowRouter.route('/', {
  name: 'home',
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { content: 'home' });
  }
});

FlowRouter.route('/transferencias/nueva', {
  name: 'transfers.create',
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { content: 'transfersCreate' });
  }
});

FlowRouter.route('/transferencias/:transferId', {
  name: 'transfers.show',
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { content: 'transfersShow' });
  }
});

FlowRouter.route('/cuentas', {
  name: 'accounts.index',
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { content: 'accountsIndex' });
  }
});

FlowRouter.route('/cuentas/agregar', {
  name: 'accounts.create',
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { content: 'accountsCreate' });
  }
});

FlowRouter.route('/cuentas/:accountId/editar', {
  name: 'accounts.update',
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { content: 'accountsUpdate' });
  }
});

FlowRouter.route('/cuentas/:accountId/eliminar', {
  name: 'accounts.remove',
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { content: 'accountsRemove' });
  }
});

FlowRouter.route('/tarjetas', {
  name: 'cards.index',
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { content: 'cardsIndex' });
  }
});

FlowRouter.route('/tarjetas/agregar', {
  name: 'cards.create',
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { content: 'cardsCreate' });
  }
});
FlowRouter.route('/tarjetas/:cardId/eliminar', {
  name: 'cards.remove',
  action: function(params, queryParams) {
    BlazeLayout.render('layout', { content: 'cardsRemove' });
  }
});

