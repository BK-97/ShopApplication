// styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  upperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
  logo: {
    width: 100,
    height: 50,
  },
  upperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
  logo: {
    width: 100,
    height: 50,
  },
  container: {
    flex:1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    marginTop: 10, 
    marginBottom: 80, 
    marginLeft: 10, 
    marginRight: 10, 
    backgroundColor:"#e8e7e6",
    borderWidth:1,
    borderColor:"#d9d9d9"
  },
  verticalContainer: {
    flex:1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  boxButton: {
    aspectRatio:1,
    width:100,
    backgroundColor: "pink",
    justifyContent: "center", 
    alignItems: "center", 
    marginHorizontal:10,
    marginVertical:10,
  },
  horizontalButton: {
    width:600,  /* Shouldnt be like that*/
    height:80,
    backgroundColor: "#d9d9d9",
    justifyContent: "center", 
    alignItems: "flex-start", 
    marginVertical:1,
    borderWidth:1,
    borderColor:"#d9d9d9",
  },
  verticalButton: {
    flexDirection:'column', 
    width:100, 
    height:120,
    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: 1,
    justifyContent: "center", 
    alignItems: "center", 
    marginHorizontal:10,
    marginVertical:10,
    borderRadius:10,
  },
  ImageCategory: {
    aspectRatio:1,
    width:'70%',
    justifyContent: "center", 
    alignItems: "center", 
  },
  buttonUnderTextView: {
    width:'100%',
    height:'30%',
    alignItems: "center", 
  },
  buttonUnderText: {
    fontSize: 13,
    fontStyle:"normal",
    color: "black",
    marginHorizontal:2,
  },
  buttonTextView: {
    width:100,
    justifyContent: "center", 
    alignItems: "center", 
    marginLeft: 10,
  },
  cartContainer: {
    position: 'absolute',
    bottom: 20, 
    alignSelf: 'center',
  },
  cartButton: {
    width: 50, 
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedCategory: {
    fontSize: 18,
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
  },
  checkoutText: {
    fontSize: 18,
    color: 'white',
  },
});
