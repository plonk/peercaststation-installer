﻿
PeerCast = {
  SourceStreamType: {
    None: 0,
    Broadcast: 1,
    Relay: 2,
    All: 0x7FFFFFFF
  },
  OutputStreamType: {
    None: 0,
    Play: 1,
    Relay: 2,
    Metadata: 4,
    Interface: 8,
    All: 0x7FFFFFFF
  },
  onSuccessFunc: function(completed) {
    return function(data) {
      if (data.error) {
        console.log(data.error);
      }
      if (completed) completed(data.result, data.error);
    };
  },
  onErrorFunc: function(completed) {
    return function(xhr, status, errorThrown) {
      if (completed) completed(undefined, { code: -1, message: status });
    };
  },
  genId: function() {
    return Math.floor(Math.random()*10000);
  },
  postRequest: function(method, params, completed) {
    var request = {
      jsonrpc: '2.0',
      id: this.genId(),
      method: method
    };
    if (params!=undefined && params!=null) {
      request.params = params;
    }
    $.post('/api/1', $.toJSON(request), this.onSuccessFunc(completed)).error(this.onErrorFunc(completed));
  },
  getVersionInfo: function(completed)    { this.postRequest('getVersionInfo', null, completed); },
  getPlugins:  function(completed)       { this.postRequest('getPlugins',     null, completed); },
  getStatus:   function(completed)       { this.postRequest('getStatus',      null, completed); },
  getSettings: function(completed)       { this.postRequest('getSettings',    null, completed); },
  setSettings: function(args, completed) { this.postRequest('setSettings',    { settings: args }, completed); },
  getChannels: function(completed)       { this.postRequest('getChannels',    null, completed); },
  getChannelStatus: function(channelId, completed) {
    this.postRequest('getChannelStatus', { channelId: channelId }, completed);
  },
  getChannelInfo: function(channelId, completed) {
    this.postRequest('getChannelInfo', { channelId: channelId }, completed);
  },
  setChannelInfo: function(channelId, info, track, completed) {
    this.postRequest('setChannelInfo', { channelId: channelId, info: info, track: track }, completed);
  },
  stopChannel: function(channelId, completed) {
    this.postRequest('stopChannel', { channelId: channelId }, completed);
  },
  bumpChannel: function(channelId, completed) {
    this.postRequest('bumpChannel', { channelId: channelId }, completed);
  },
  getChannelOutputs: function(channelId, completed) {
    this.postRequest('getChannelOutputs', { channelId: channelId }, completed);
  },
  stopChannelOutput: function(channelId, id, completed) {
    this.postRequest('stopChannelOutput', { channelId: channelId, outputId: id }, completed);
  },
  getChannelConnections: function(channelId, completed) {
    this.postRequest('getChannelConnections', { channelId: channelId }, completed);
  },
  stopChannelConnection: function(channelId, id, completed) {
    this.postRequest('stopChannelConnection', { channelId: channelId, connectionId: id }, completed);
  },
  restartChannelConnection: function(channelId, id, completed) {
    this.postRequest('restartChannelConnection', { channelId: channelId, connectionId: id }, completed);
  },
  getChannelRelayTree: function(channelId, completed) {
    this.postRequest('getChannelRelayTree', { channelId: channelId }, completed);
  },
  getContentReaders:      function(completed) { this.postRequest('getContentReaders',      null, completed); },
  getSourceStreams:       function(completed) { this.postRequest('getSourceStreams',       null, completed); },
  getYellowPageProtocols: function(completed) { this.postRequest('getYellowPageProtocols', null, completed); },
  getYellowPages:         function(completed) { this.postRequest('getYellowPages',         null, completed); },
  addYellowPage: function(protocol, name, announce_uri, channels_uri, completed) {
    this.postRequest('addYellowPage', {
      protocol: protocol,
      name: name,
      announceUri: announce_uri,
      channelsUri: channels_uri
    }, completed);
  },
  removeYellowPage: function(id, completed) {
    this.postRequest('removeYellowPage', { yellowPageId: id }, completed);
  },
  stopAnnounce: function(yellowPageId, channelId, completed) {
    this.postRequest('stopAnnounce', { yellowPageId: yellowPageId, channelId: channelId }, completed);
  },
  restartAnnounce: function(yellowPageId, channelId, completed) {
    this.postRequest('restartAnnounce', { yellowPageId: yellowPageId, channelId: channelId }, completed);
  },
  getListeners: function(completed) {
    this.postRequest('getListeners', null, completed);
  },
  addListener: function(address, port, localAccepts, globalAccepts, localAuthRequired, globalAuthRequired, completed) {
    this.postRequest('addListener', {
      address: address,
      port: port,
      localAccepts: localAccepts,
      globalAccepts: globalAccepts,
      localAuthorizationRequired: localAuthRequired,
      globalAuthorizationRequired: globalAuthRequired
    }, completed);
  },
  setListenerAccepts: function(id, localAccepts, globalAccepts, completed) {
    this.postRequest('setListenerAccepts', { listenerId: id, localAccepts: localAccepts, globalAccepts: globalAccepts }, completed);
  },
  setListenerAuthorizationRequired: function(id, localAuthorizationRequired, globalAuthorizationRequired, completed) {
    this.postRequest('setListenerAuthorizationRequired', {
      listenerId: id,
      localAuthorizationRequired: localAuthorizationRequired,
      globalAuthorizationRequired: globalAuthorizationRequired
    }, completed);
  },
  resetListenerAuthenticationKey: function(id, completed) {
    this.postRequest('resetListenerAuthenticationKey', { listenerId: id }, completed);
  },
  removeListener: function(id, completed) {
    this.postRequest('removeListener', { listenerId: id }, completed);
  },
  broadcastChannel: function(yellowPageId, sourceUri, sourceStream, contentReader, info, track, completed) {
    this.postRequest('broadcastChannel', {
      yellowPageId: yellowPageId,
      sourceUri: sourceUri,
      sourceStream: sourceStream,
      contentReader: contentReader,
      info: info,
      track: track
    }, completed);
  },
  getBroadcastHistory: function(completed) {
    this.postRequest('getBroadcastHistory', null, completed);
  },
  addBroadcastHistory: function(info, completed) {
    this.postRequest('addBroadcastHistory', { info: info }, completed);
  },

  getLogSettings: function(completed) {
    this.postRequest('getLogSettings', null, completed);
  },
  setLogSettings: function(settings, completed) {
    this.postRequest('setLogSettings', { settings: settings }, completed);
  },
  getLog: function(from, maxLines, completed) {
    this.postRequest('getLog', { from: from, maxLines: maxLines }, completed);
  },
  clearLog: function(completed) {
    this.postRequest('clearLog', null, completed);
  },

  getNotificationMessages: function(completed) {
    this.postRequest('getNotificationMessages', null, completed);
  },
  checkBandwidth: function(completed) {
    this.postRequest('checkBandwidth', null, completed);
  },
  checkPorts: function(completed) {
    this.postRequest('checkPorts', null, completed);
  },

  checkUpdate: function(completed) {
    this.postRequest('checkUpdate', null, completed);
  },
  getNewVersions: function(completed) {
    this.postRequest('getNewVersions', null, completed);
  },

  getYPChannels: function(completed) {
    this.postRequest('getYPChannels', null, completed);
  },
  updateYPChannels: function(completed) {
    this.postRequest('updateYPChannels', null, completed);
  },
  getUserConfig: function(user, key, completed) {
    this.postRequest('getUserConfig', { user: user, key: key }, completed);
  },
  setUserConfig: function(user, key, value, completed) {
    this.postRequest('setUserConfig', { user: user, key: key, value: value }, completed);
  },
 };

