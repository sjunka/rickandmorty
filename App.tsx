import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const API_URL = 'https://rickandmortyapi.com/api/character';

const STATUS_COLORS: Record<string, string> = {
  Alive: '#55cc44',
  Dead: '#d63d2e',
  unknown: '#9e9e9e',
};

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  location: { name: string };
}

const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: STATUS_COLORS[character.status] ?? STATUS_COLORS.unknown },
            ]}
          />
          <Text style={styles.statusText}>
            {character.status} — {character.species}
          </Text>
        </View>
        <Text style={styles.location}>{character.location.name}</Text>
      </View>
    </View>
  );
};

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(API_URL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = async () => {
    if (!nextPage || loading) return;
    setLoading(true);
    try {
      const response = await fetch(nextPage);
      const data = await response.json();
      setCharacters((prev) => [...prev, ...data.results]);
      setNextPage(data.info.next);
      setError(null);
    } catch (e) {
      setError('Failed to load characters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar style="light" />
        <Text style={styles.title}>Rick and Morty</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <FlatList
          data={characters}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <CharacterCard character={item} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator style={styles.loader} /> : null}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c24',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#97ce4c',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  error: {
    color: '#d63d2e',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#2a2a35',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  avatar: {
    width: 96,
    height: 96,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: '#ddd',
    fontSize: 13,
  },
  location: {
    color: '#999',
    fontSize: 12,
  },
  loader: {
    paddingVertical: 16,
  },
});
