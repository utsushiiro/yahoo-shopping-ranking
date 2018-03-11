import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

export default class Ranking extends React.Component {
  componentWillMount() {
    this.props.onMount(this.props.categoryId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.categoryId !== nextProps.categoryId) {
      this.props.onUpdate(nextProps.categoryId);
    }
  }

  render() {
    const { category, ranking, error } = this.props;
    return (
      <div>
        <h2>{ typeof category !== 'undefined' ? `${category.name}のランキング` : '' }</h2>
        {
          (()=>{
            if (error) {
              return <p>エラーが発生しました。リロードしてください。</p>;
            } else if (typeof ranking === 'undefined') {
              return <p>読み込み中...</p>;
            } else {
              return (
                ranking.map((item, i)=> (
                  <Card
                    key={`ranking-item-${item.code}`}
                    style={{ maxWidth: '500px', margin: '32px auto', padding: "20px 0" }}
                  >
                    <CardMedia
                      image={ item.imageUrl }
                      title={ `${i + 1}位 ${item.name}` }
                      style={{ height: 200, backgroundSize: "contain" }}
                    >
                    </CardMedia>
                    <CardContent style={{ textAlign: "center" }}>
                      <Typography>
                        { `${i + 1}位 ${item.name}` }
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant={"raised"}
                        color={"secondary"}
                        fullWidth
                        href={item.url}
                      >
                        商品ページへ
                      </Button>
                    </CardActions>
                  </Card>
                ))
              );
            }
          })()
        }
      </div>
    );
  }
}

Ranking.propTypes = {
  categoryId: PropTypes.string,
  onMount: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  ranking: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired
    })
  ),
  error: PropTypes.bool
};

Ranking.defaultProps = {
  categoryId: '1'
};