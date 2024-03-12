"""empty message

Revision ID: e1928bfab93c
Revises: 059bd3b2efa1
Create Date: 2023-08-07 21:03:51.030788

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e1928bfab93c'
down_revision = '059bd3b2efa1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_ answer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('question_id', sa.Integer(), nullable=True),
    sa.Column('given_question', sa.String(length=200), nullable=True),
    sa.Column('user_answer', sa.String(length=200), nullable=True),
    sa.Column('correct_answer', sa.String(length=200), nullable=True),
    sa.Column('is_user_correct', sa.Boolean(), nullable=True),
    sa.Column('category', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # op.drop_table('clues')
    # op.drop_table('questionstesting')
    # op.drop_table('categories')
    # op.drop_table('user_answer')
    # op.drop_table('games')
    # op.drop_table('questions')
    # op.drop_table('contestants')
    # op.drop_table('seasons')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('seasons',
    sa.Column('id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('season_name', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('start_date', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('end_date', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('total_games', sa.INTEGER(), autoincrement=False, nullable=True)
    )
    op.create_table('contestants',
    sa.Column('id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('name', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('notes', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('games_played', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('total_winnings', sa.INTEGER(), autoincrement=False, nullable=True)
    )
    op.create_table('questions',
    sa.Column('questionid', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('answer', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('question', sa.VARCHAR(length=650), autoincrement=False, nullable=True),
    sa.Column('value', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('airdate', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('categoryid', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('gameid', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('categorytitle', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('cluescount', sa.INTEGER(), autoincrement=False, nullable=True)
    )
    op.create_table('games',
    sa.Column('id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('episode_num', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('season_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('air_date', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('notes', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('contestant1', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('contestant2', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('contestant3', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('winner', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('score1', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('score2', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('score3', sa.INTEGER(), autoincrement=False, nullable=True)
    )
    op.create_table('user_answer',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('question_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('given_question', sa.VARCHAR(length=200), autoincrement=False, nullable=True),
    sa.Column('user_answer', sa.VARCHAR(length=200), autoincrement=False, nullable=True),
    sa.Column('correct_answer', sa.VARCHAR(length=200), autoincrement=False, nullable=True),
    sa.Column('is_user_correct', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('category', sa.VARCHAR(length=200), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='user__answer_pkey'),
    sa.UniqueConstraint('given_question', name='user__answer_given_question_key')
    )
    op.create_table('categories',
    sa.Column('category', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('clue_count', sa.INTEGER(), autoincrement=False, nullable=True)
    )
    op.create_table('questionstesting',
    sa.Column('questionid', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('answer', sa.VARCHAR(length=255), autoincrement=False, nullable=True)
    )
    op.create_table('clues',
    sa.Column('id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('game_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('value', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('daily_double', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('round', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('categorytitle', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('clue', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('response', sa.TEXT(), autoincrement=False, nullable=True)
    )
    op.drop_table('user__answer')
    # ### end Alembic commands ###