import { useCallback, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { CommentInputProps } from '@/interfaces/components';
import { MESSAGES } from '@/constants';
import { useThemeColors } from '@/hooks/useThemeColors';

/** Owns the draft text so the screen only hears about finished comments. */
export const CommentInput = ({ onSubmit }: CommentInputProps) => {
  const colors = useThemeColors();
  const [text, setText] = useState('');

  const submit = useCallback(() => {
    const trimmed = text.trim();
    if (trimmed.length === 0) return;
    onSubmit(trimmed);
    setText('');
  }, [text, onSubmit]);

  return (
    <View className="mb-8 mt-4 flex-row items-center">
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={MESSAGES.commentPlaceholder}
        placeholderTextColor={colors.iconMuted}
        accessibilityLabel="Comment input"
        className="flex-1 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-3 text-base text-gray-800 dark:text-gray-200"
        onSubmitEditing={submit}
        returnKeyType="send"
      />
      <Pressable
        onPress={submit}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Send comment"
        className="ml-2 rounded-full bg-primary-600 p-2 active:bg-primary-700 dark:active:bg-primary-600"
      >
        <Ionicons name="arrow-forward" size={20} color="white" />
      </Pressable>
    </View>
  );
};
