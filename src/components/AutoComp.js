import React, { Component } from 'react';
import axios from 'axios'
import keys from './keys.js'

`http://autocomplete.geocoder.api.here.com/6.2/suggest.json
  ?app_id=${keys.hereID}
  &app_code=${keys.hereCode}
  &query=Pariser+1+Berl
  &beginHighlight=<b>
  &endHighlight=</b>`