'use strict';

let GoogleAuth;

function hasGrantedScopes(user) {
  return user.hasGrantedScopes(
    'https://www.googleapis.com/auth/analytics.readonly'
  );
}

gapi.load('client', function() {
  gapi.load('client:auth2', function() {
    gapi.client.init({
      clientId: 'client_id',
      discoveryDocs: [
        'https://www.googleapis.com/discovery/v1/apis/analyticsreporting/v4/rest',
      ],
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
    }).then(function() {
      // NOTE: this function never call in Chrome extension

      GoogleAuth = gapi.auth2.getAuthInstance();

      const user = GoogleAuth.currentUser.get();

      GoogleAuth.isSignedIn.listen(function(isSigned) {
        console.log(`isSigned: ${isSigned}`);

        if (hasGrantedScopes(user)) {
          console.log('authorized');
          console.log('signout');
          GoogleAuth.signOut();
        } else {
          console.log('unauthorized');
        }
      });
    });
  });
});
