import { Text, View } from 'react-native';
import type { CommentListProps } from '@/interfaces/components';
import { MESSAGES } from '@/constants';

export const CommentList = ({ comments }: CommentListProps) => (
  <View>
    <Text className="mt-6 text-base font-semibold text-gray-800 dark:text-gray-200">
      Comments ({comments.length})
    </Text>

    {comments.length === 0 && (
      <Text className="mt-2 text-sm text-gray-400 dark:text-gray-500">{MESSAGES.noComments}</Text>
    )}

    {comments.map((comment) => (
      <View key={comment.id} className="mt-2 rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-2">
        <Text className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</Text>
        <Text className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </Text>
      </View>
    ))}
  </View>
);
