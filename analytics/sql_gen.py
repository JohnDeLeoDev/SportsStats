from ai_text_to_sql.data_connectors import SQLiteConnector
from ai_text_to_sql.llm_connectors import OpenAIConnector
from ai_text_to_sql.text_to_sql import TextToSQL

def initialize_connectors():
    sql_connector = SQLiteConnector(database='chinook.db')
    openai_connector = OpenAIConnector(engine = 'gpt-3.5-turbo-16k', api_key = 'ADD key')
    return sql_connector, openai_connector

def main():
    sql_connector, ai_connector = initialize_connectors()

    text_to_sql = TextToSQL(sql_connector,ai_connector)
    text_query = '''Give me Aaron Judge stats from July 1 to august 1. 
                Only include batting average, slugging and on base percentage.'''
    sql_query = text_query.convert_text_to_sql(text_query)
    results = text_to_sql.query(text_query)
    df = text_to_sql.query_df(text_query)

if __name__ == '__main__':
    main()
