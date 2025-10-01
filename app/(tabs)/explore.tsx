import { Image, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Contact = {
  label: string;
  link: string;
};

type CardProps = {
  avatar: string;
  name: string;
  role: string;
  company: string;
  contacts: Contact[];
};

function Card(props: CardProps) {
  
  const { width } = useWindowDimensions();
  const isWide: boolean = width >= 500;
  const contacts = props.contacts;
  return (
    <View style={[
      isWide ? styles.cardWide : styles.cardNarrow,
      Platform.OS === "ios" ? styles.cardShadowIOS : styles.cardShadowAndroid
    ]}>
      <View style={styles.main}>
        <Image style={styles.avatar} source={{ uri: props.avatar }} />
        <View style={styles.info}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.role}>{props.role}</Text>
          <Text style={styles.company}>{props.company}</Text>
        </View>
      </View>
      <View style={styles.chipContainer}>
        {contacts.map((contact, idx) => (
          <TouchableOpacity key={idx} style={styles.chip}>
            <Text onPress={()=>Linking.openURL(contact.link)} style={styles.chipText}>{contact.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function TabTwoScreen() {


  const cardProps: CardProps = {
    avatar: "https://randomuser.me/api/portraits/men/40.jpg",
    name: "Alex Smith",
    role: "React Native Developer",
    company: "Tech Innovators Ltd.",
    contacts: [
      { label: "Phone", link: "tel:+1234567890" },
      { label: "Email", link: "mailto:test"},
      { label: "Website", link: "https://example.com" },
    ]
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card 
          avatar={cardProps.avatar}
          name={cardProps.name}
          role={cardProps.role}
          company={cardProps.company}
          contacts={cardProps.contacts}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  cardWide: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 22,
  },
  cardNarrow: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 22,
  },
  cardShadowIOS: {
    shadowColor: '#222',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
  },
  cardShadowAndroid: {
    elevation: 7,
  },
  main: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 14,
    width: '100%',
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  info: {
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  role: {
    fontSize: 17,
    color: '#555',
    marginBottom: 2,
  },
  company: {
    fontSize: 15,
    color: '#1e90ff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
    justifyContent: 'center',
    width: '100%',
  },
  chip: {
    minWidth: 100,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e3e7f1',
    borderRadius: 19,
    margin: 4,
    alignItems: 'center',
  },
  chipText: {
    color: '#1e90ff',
    fontWeight: '500',
  },
});
