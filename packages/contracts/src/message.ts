export interface MessageMetadata {
  correlationId: string;
  timestamp: string;
}

export interface MessageEnvelope<T> {
  metadata: MessageMetadata;
  data: T;
}
