import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(true);
    const [data, setData] = useState('Noch nicht gescanned');
    const [loadProfileArray, setLoadProfileArray] = useState(false);

    let [error, setError] = useState();
    let [errorIng,setErrorIng] = useState();
    let [allergens, setAllergens] = useState([]);
    const [apiResponse, setApiResponse] = useState(null);
    const [allergene, setAllergene] = useState(false)
    const [productName, setProductName] = useState("Name")

    const [ingredients, setIngredients] = useState([]);
    const [showIngredients, setShowIngredients] = useState([]);

    const [showScreen, setShowScreen] = useState(1)

    const [erdnuesse, setErdnuesse] = useState(false)
    const [fisch, setFisch] = useState(false)
    const [ei, setEi] = useState(false)
    const [gluten, setGluten] = useState(false)
    const [krebstiere, setKrebstiere] = useState(false)
    const [lupine, setLupine] = useState(false)
    const [milch, setMilch] = useState(false)
    const [schalenfruechte, setSchalenfruechte] = useState(false)
    const [sellerie, setSellerie] = useState(false)
    const [senf, setSenf] = useState(false)
    const [sesam, setSesam] = useState(false)
    const [soja, setSoja] = useState(false)
    const [weichtiere, setWeichtiere] = useState(false)


      const toggleErdnuesse = () => {setErdnuesse(previousState => !previousState);
        storeData('erdnuesse', erdnuesse, 'Erdnüsse');}
      const toggleFisch = () => {setFisch(previousState => !previousState);
        storeData('fisch', fisch, 'Fisch');}
      const toggleEi = () => {setEi(previousState => !previousState);
        storeData('ei', ei, 'Ei');}
      const toggleGluten = () => {setGluten(previousState => !previousState);
        storeData('gluten', gluten, 'Gluten');}
      const toggleKrebstiere = () => {setKrebstiere(previousState => !previousState);
        storeData('krebstiere', krebstiere, 'Krebstiere');}
      const toggleLupine = () => {setLupine(previousState => !previousState);
        storeData('lupine', lupine, 'Lupine');}
      const toggleMilch = () => {setMilch(previousState => !previousState);
        storeData('milch', milch, 'Milch');}
      const toggleSchalenfruechte = () => {setSchalenfruechte(previousState => !previousState);
        storeData('schalenfruechte', schalenfruechte, 'Schalenfrüchte');}
      const toggleSellerie = () => {setSellerie(previousState => !previousState);
        storeData('sellerie', sellerie, 'Sellerie');}
      const toggleSenf = () => {setSenf(previousState => !previousState);
        storeData('senf', senf, 'Senf');}
      const toggleSesam = () => {setSesam(previousState => !previousState);
        storeData('sesam', sesam, 'Sesam');}
      const toggleSoja = () => {setSoja(previousState => !previousState);
        storeData('soja', soja, 'Soja');}
      const toggleWeichtiere = () => {setWeichtiere(previousState => !previousState);
        storeData('weichtiere', weichtiere, 'Weichtiere');}


    const storeData = async (id, value, arrayItem) => {
      try {
        const jsonValue = JSON.stringify(!value);
        console.log(jsonValue);
        setProfile(arrayItem);
        console.log(profileAllergens)
        await AsyncStorage.setItem(id, jsonValue);
      } catch (e) {
        console.log(e);
      }
    };

    const setProfile = (arrayItem) => {
      setProfileAllergens((prevProfileAllergens) =>{
        if (prevProfileAllergens.includes(arrayItem)) {
          return prevProfileAllergens.filter((profileAllergen) => profileAllergen !== arrayItem);
        } else {
          return [...prevProfileAllergens, arrayItem];
        }
      });
    }

    useEffect(() => {
     getData();
     setArray();
    },[])

    const getData = async () => { 
      try {
        const erdnussData = await AsyncStorage.getItem('erdnuesse');
        setErdnuesse(JSON.parse(erdnussData));
        
        const fischData = await AsyncStorage.getItem('fisch');
        setFisch(JSON.parse(fischData));
      
        const eiData = await AsyncStorage.getItem('ei');
        setEi(JSON.parse(eiData));
        
        const glutenData = await AsyncStorage.getItem('gluten');
        setGluten(JSON.parse(glutenData));
        
        const krebstiereData = await AsyncStorage.getItem('krebstiere');
        setKrebstiere(JSON.parse(krebstiereData));
        
        const lupineData = await AsyncStorage.getItem('lupine');
        setLupine(JSON.parse(lupineData));
        
        const milchData = await AsyncStorage.getItem('milch');
        setMilch(JSON.parse(milchData));

        const schalenfruechteData = await AsyncStorage.getItem('schalenfruechte');
        setSchalenfruechte(JSON.parse(schalenfruechteData));

        const sellerieData = await AsyncStorage.getItem('sellerie');
        setSellerie(JSON.parse(sellerieData)); 

        const senfData = await AsyncStorage.getItem('senf');
        setSenf(JSON.parse(senfData));

        const sesamData = await AsyncStorage.getItem('sesam');
        setSesam(JSON.parse(sesamData));

        const sojaData = await AsyncStorage.getItem('soja');
        setSoja(JSON.parse(sojaData));

        const weichtiereData = await AsyncStorage.getItem('weichtiere');
        setWeichtiere(JSON.parse(weichtiereData));

      } catch (e) {
        // error reading value
      }
    };

    const setArray = () => {
      if(loadProfileArray == false){
      erdnuesse ? setProfile('Erdnüsse') : null;
      fisch ? setProfile('Fisch') : null;
      ei ? setProfile('Ei') : null;
      gluten ? setProfile('Gluten') : null;
      krebstiere ? setProfile('Krebstiere') : null;
      lupine ? setProfile('Lupine') : null;
      milch ? setProfile('Milch') : null;
      schalenfruechte ? setProfile('Schalenfrüchte') : null;
      sellerie ? setProfile('Sellerie') : null;
      senf ? setProfile('Senf') : null;
      sesam ? setProfile('Sesam') : null;
      soja ? setProfile('Soja') : null;
      weichtiere ? setProfile('Weichtiere') : null;
      setLoadProfileArray(true);
      }
    }

    const [profileAllergens, setProfileAllergens] = useState([])

    const englishAllergens = [
      'en:peanuts',
      'en:fish',
      'en:eggs',
      'en:gluten',
      'en:crustaceans',
      'en:lupin',
      'en:milk',
      'en:nuts',
      'en:celery',
      'en:mustard',
      'en:sesame-seeds',
      'en:soybeans',
      'en:sulphur-dioxide-and-sulphites',
      'en:molluscs',
    ];
  
    const germanAllergens = [
      'Erdnüsse',
      'Fisch',
      'Ei',
      'Gluten',
      'Krebstiere',
      'Lupine',
      'Milch',
      'Schalenfrüchte',
      'Sellerie',
      'Senf',
      'Sesam',
      'Soja',
      'Schwefeldioxide und Sulfite',
      'Weichtiere',
    ];

    const askForCameraPermission = () => {
      (async () =>  {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status == 'granted');
      })()
    }

    useEffect(() => {
      askForCameraPermission();
    },[])

    const translateAllergens = () => {
      const translatedAllergens = allergens.map(allergen => {
        const index = englishAllergens.indexOf(allergen);
        return index !== -1 ? germanAllergens[index] : allergen;
      });
  
      return translatedAllergens;
    };

    const handleBarcodeScan = async ({ type, data }) =>{
      setData(data);
      setScanned(true);
      console.log(data);
      try {
        const response = await fetch(
          'https://world.openfoodfacts.org/api/v2/product/' + data +'?fields=allergens,ingredients,product_name'
        );

        if (!response.ok) {
          throw new Error('Daten Zugriff fehlgeschlagen');
        }

        const info = await response.json();
        if (info.status === 1 && info.product.allergens && info.product.ingredients) {
          const allergensArray = info.product.allergens.split(',').map(item => item.trim());
          setAllergens(allergensArray);
          setIngredients(info.product.ingredients || []);
          setProductName(info.product.product_name);
          setError(null);
          setAllergene(true)
          setShowScreen(2);
        } else {
          setError('Keine Allergen Informationen vorhanden');
          setIngredients(info.product.ingredients || []);
          setProductName(info.product.product_name);
          setAllergene(false)
          setShowScreen(2);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Daten konnten nicht geladen werden');
        setShowScreen(2);
      }
    }

    const translatedAllergens = translateAllergens();

    //Kamerazugriff Benötigt
    if(hasPermission == null){
      return(
        <View style={styles.standardText}>
          <Text>Kamerazugriff benötigt!</Text>
        </View>
      )
    }

    // Kamerazugriff verweigert
    if(hasPermission === false){
      return(
        <View style={styles.container}>
          <Text style={styles.standardText}>Kamerazugriff verweigert!</Text>
          <Button title = {'Kamerazugriff erlauben'} onPress={() => askForCameraPermission()}/>
        </View>
      )
    }
  
    //Barcodescan Bildschirm
  if(showScreen === 1){
  return (
    <View style={styles.container}>
      <Image
          source={require('./qr-scan.png')}
          style={styles.titelIcon}
        />
        <View style={[styles.linie, {top:'13%'}, {right:'0%'}]}/>
      <View style={styles.barcodebox}>
        {!scanned && <BarCodeScanner style={styles.barcodescanner} onBarCodeScanned={scanned ? undefined: handleBarcodeScan}
        />}      
        </View>

    <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(!scanned) + setArray()}>
      {scanned && <Text style={styles.scanButtonText}>
        Scannen
      </Text>}
      {!scanned && <Text style={styles.scanButtonText}>
        Beenden
      </Text>}
    </TouchableOpacity>

      <View style={[styles.linie, {top:'86%'}, {right:'0%'}]}/>

        <TouchableOpacity style={styles.scanNavigator} activeOpacity={0.5} onPress={() =>setShowScreen(1)}>
          <Image
            source={require('./qr-scan.png')}
            style={styles.scanNavigatorIcon}
          />
          <Text style={styles.navigatorText}> Scan </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profilNavigator} activeOpacity={0.5} onPress={() => setScanned(true) + setShowScreen(3)}>
          <Image
            source={require('./user.png')}
            style={styles.profilNavigatorIcon}
          />
          <Text style={styles.navigatorText}> Profil </Text>
        </TouchableOpacity>

    </View>
  );
}

    //Allergenausgabe Bildschirm
  if(showScreen === 2){
    return(
      <View style={styles.container}>
        <Image
          source={require('./qr-scan.png')}
          style={styles.titelIcon}
        />
       <View style={[styles.linie, {top:'13%'}, {right:'0%'}]}/>
       <View  style={styles.allergenBox}>
       <ScrollView showsVerticalScrollIndicator={false}>
       <View style={[{alignItems: 'center'}, {backgroundColor: '#474747'}]}>
        <Text style={styles.titelText}>Produkt:</Text>
        </View>
        <Text style={[styles.standardText, {padding:10}]}>{productName}</Text>
        <View style={[{alignItems: 'center'}, {backgroundColor: '#474747'}]}>
        <Text style={styles.titelText}>Allergene:</Text>
        </View>
        <Text style={styles.standardText}>
      {allergene && translatedAllergens.length > 0 ? (
            translatedAllergens.map((allergen, index) => (
              <Text key={index} style={{ color: profileAllergens.includes(allergen) ? '#fa382a' : 'white' }}> - {allergen} {'\n'}</Text>
            ))
          ) : (
            <Text style={styles.standardText}>{error}</Text>
          )}
          </Text>
          <View style={[{alignItems: 'center'}, {backgroundColor: '#474747'}]}>
          <Text style={styles.titelText}>Zutaten:</Text>
          </View>
          {showIngredients && ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => (
              <Text style={[styles.standardText]} key={index}>-{ingredient.text}</Text>
            ))
          ) : (
            <Text style={styles.standardText}>Keine Inhaltsstoff angaben vorhanden</Text>
          )}
          
        </ScrollView>
        </View>
      <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false) + setShowScreen(1)}>
      <Text style={styles.scanButtonText}>
        Scannen
      </Text>
    </TouchableOpacity>
      
      <View style={[styles.linie, {top:'86%'}, {right:'0%'}]}/>

        <TouchableOpacity style={styles.scanNavigator} activeOpacity={0.5} onPress={() => setShowScreen(1)}>
          <Image
            source={require('./qr-scan.png')}
            style={styles.scanNavigatorIcon}
          />
          <Text style={styles.navigatorText}> Scan </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profilNavigator} activeOpacity={0.5} onPress={() => setScanned(true) +  setShowScreen(3)}>
          <Image
            source={require('./user.png')}
            style={styles.profilNavigatorIcon}
          />
          <Text style={styles.navigatorText}> Profil </Text>
        </TouchableOpacity>
    </View>
    );
  }
  
    //Profilbildschirm
  if(showScreen === 3) {
    return (
      <View style={styles.container}>
        
        <Image
            source={require('./user.png')}
            style={styles.titelIcon}
          />
          
        
          <View style={[styles.linie, {top:'13%'}, {right:'0%'}]}/>

          <View style={styles.profilBox}>
          <Switch
            onValueChange={toggleErdnuesse}
            value={erdnuesse}
          />
          
          <Switch
            onValueChange={toggleFisch}
            value={fisch}
          />
          
          <Switch
            onValueChange={toggleEi}
            value={ei}
          />
          
          <Switch
            onValueChange={toggleGluten}
            value={gluten}
          />
          
          <Switch
            onValueChange={toggleKrebstiere}
            value={krebstiere}
          />
          
          <Switch
            onValueChange={toggleLupine}
            value={lupine}
          />
          
          <Switch
            onValueChange={toggleMilch}
            value={milch}
          />  
          
          <Switch
            onValueChange={toggleSchalenfruechte}
            value={schalenfruechte}
          />
          
          <Switch
            onValueChange={toggleSellerie}
            value={sellerie}
          />
          
          <Switch
            onValueChange={toggleSenf}
            value={senf}
          />
          
          <Switch
            onValueChange={toggleSesam}
            value={sesam}
          />
          
          <Switch
            onValueChange={toggleSoja}
            value={soja}
          />
          
          <Switch
            onValueChange={toggleWeichtiere}
            value={weichtiere}
          />
          
          </View>
          <View style={styles.profilTextBox}>
            <Text style={styles.profilText}>Erdnüsse</Text>
            <Text style={styles.profilText}>Fisch</Text>
            <Text style={styles.profilText}>Ei</Text>
            <Text style={styles.profilText}>Gluten</Text>
            <Text style={styles.profilText}>Krebstiere</Text>
            <Text style={styles.profilText}>Lupine</Text>
            <Text style={styles.profilText}>Milch</Text>
            <Text style={styles.profilText}>Schalenfrüchte</Text>
            <Text style={styles.profilText}>Sellerie</Text>
            <Text style={styles.profilText}>Senf</Text>
            <Text style={styles.profilText}>Sesam</Text>
            <Text style={styles.profilText}>Soja</Text>
            <Text style={styles.profilText}>Weichtiere</Text>
          </View>
          <View style={styles.profilLinienBox}>
          <View style={[styles.linieProfil]}/>
          <View style={[styles.linieProfil]}/>
          <View style={[styles.linieProfil]}/>
          <View style={[styles.linieProfil]}/>
          <View style={[styles.linieProfil]}/>
          <View style={[styles.linieProfil]}/>
          <View style={[styles.linieProfil]}/>
          <View style={[styles.linieProfil]}/>
          <View style={[styles.linieProfil]}/>
          <View style={[styles.linieProfil]}/>
          <View style={[styles.linieProfil]}/>
          <View style={[styles.linieProfil]}/>
          </View>
          <View style={styles.linieSenkrecht}/>
          <View style={[styles.linie, {top:'86%'}, {right:'0%'}]}/>
  
          
          <TouchableOpacity style={styles.scanNavigator} activeOpacity={0.5} onPress={() =>setShowScreen(1)}>
            <Image
              source={require('./qr-scan.png')}
              style={styles.scanNavigatorIcon}
            />
            <Text style={styles.navigatorText}> Scan </Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.profilNavigator} activeOpacity={0.5} onPress={() => console.log(profileAllergens)}>
            <Image
              source={require('./user.png')}
              style={styles.profilNavigatorIcon}
            />
            <Text style={styles.navigatorText}> Profil </Text>
          </TouchableOpacity>
  
      </View>
    );
  }

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333232',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodebox: {
    position: 'absolute',
    top: '24%',
    left: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '43%',
    width: '90%',
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#403f3f'
  },
  barcodescanner:{
    width: '100%',
    height: '185%',
  },
  standardText:{
    fontSize: 22,
    margin:4,
    color: '#ffffff'
  },
  titelText:{
    fontSize: 25,
    margin:10,
    color: '#ffffff',

  },
  navigatorText:{
    fontSize: 16,
    margin:1,
    color: '#ffffff'
  },
  titelIcon: {
    position: 'absolute',
    top: '5%',
    left: '43%',
    height:'6.8%',
    width: '14%'
  },
  scanNavigator: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '90%',
    left: '21%',
    height:'7%',
    width: '14%'
  },
  scanNavigatorIcon: {
    height:'97%',
    width: '100%',
  },
  profilNavigator: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '90%',
    right: '21%',
    height:'7%',
    width: '14%'
  },
  profilNavigatorIcon: {
    height:'97%',
    width: '100%',
  },
  linie: {
    position: 'absolute',
    top: '86%',
    right: '0%',
    height: '0.3%',
    width: '150%',
    backgroundColor: '#696969'
  },
  scanButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '72%',
    right: '33%',
    height: '8%',
    width: '34%',
    backgroundColor: '#79b1c9',
    borderRadius: 20,
  },
  scanButtonText: {
    fontSize: 22,
    margin:6,
    color: '#ffffff'
  },
  allergenBox: {
    position: 'absolute',
    top: '20%',
    right: '3%',
    width: '94%',
    height: '50%',
    backgroundColor: '#4d4d4d',
    borderRadius: 20,
    overflow: 'hidden',
  },
  profilBox: {
    flex: 0.7,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '95%',
    padding: 10,
    zIndex: 2,
  },
  profilText:{
    fontSize: 22,
    margin:3,
    color: '#ffffff',
  },
  profilTextBox: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '95%',
    height: '71%',
    padding: 10,
    position: 'absolute',
    left: '5%'
  },
  profilLinienBox: {
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    width: '85%',
    height: '72%',
    padding: 10,
    position: 'absolute',
    left: '20%',
    top:'14%',
  },
  linieProfil: {
    left:'-30%',
    height: '0.3%',
    width: '150%',
    backgroundColor: '#404040'
  },
  linieSenkrecht: {
    position: 'absolute',
    left:'74%',
    height: '68%',
    width: '0.52%',
    backgroundColor: '#404040'
  },
}); 