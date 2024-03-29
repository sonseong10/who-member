import React from 'react'
import { Link } from 'react-router-dom'
import styles from './product-detail.module.css'
import buttonStyle from '../../styles/modules/buttons.module.css'

function ProductDetail() {
  return (
    <div className="col-sm-4 col-md-10 col-lg-9">
      <div className={styles.headerWrapper}>
        <h3>상품등록</h3>
        <div>
          <Link
            className={`${buttonStyle.baseBtn} `}
            to={'/admin/product/list'}
          >
            취소
          </Link>
          <button
            className={`${buttonStyle.baseBtn} ${buttonStyle.primaryBtn}`}
          >
            등록
          </button>
        </div>
      </div>

      <div>
        <strong>기본정보</strong>
        <dl>
          <div>
            <dt>공급사</dt>
            <dd>
              <input />
            </dd>
          </div>
          <div>
            <dt>상품명</dt>
            <dd>
              <input />
            </dd>
          </div>
        </dl>
        <dl>
          <div>
            <dt>대표이미지</dt>
            <dd>
              <label htmlFor="image">이미지선택</label>
              <input type="file" id="image" />
            </dd>
          </div>
          <div>
            <dt>추가이미지</dt>
            <dd>
              <label htmlFor="addImage">이미지선택</label>
              <input type="file" id="addImage" />
            </dd>
          </div>
        </dl>

        <strong>상세정보</strong>
        <dl>
          <div>
            <dt>HTML작성</dt>
            <dd>
              <textarea name="" id=""></textarea>
            </dd>
          </div>
        </dl>

        <strong>가격정보</strong>
        <dl>
          <div>
            <dt>공급가</dt>
            <dd>
              <input />
            </dd>
          </div>
          <div>
            <dt>소비자가</dt>
            <dd>
              <input />
            </dd>
          </div>
          <div>
            <dt>관세</dt>
            <dd>
              <input />
            </dd>
          </div>
          <div>
            <dt>최대구매수량</dt>
            <dd>
              <input />
            </dd>
          </div>
        </dl>

        <div>
          <strong>태그&연관검색어</strong>
          <input />
        </div>

        <strong>상품옵션</strong>
        <dl>
          <div>
            <dt>옵션설정</dt>
            <dd></dd>
          </div>
        </dl>

        <strong>정보고시</strong>
        <dl>
          <div>
            <dt>브랜드</dt>
            <dd></dd>
          </div>
          <div>
            <dt>제조사</dt>
            <dd></dd>
          </div>
        </dl>

        <strong>베송정책</strong>

        <strong>판매 및 전시상태</strong>
      </div>
    </div>
  )
}

export default ProductDetail
